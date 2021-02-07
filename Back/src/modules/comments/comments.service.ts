import { Injectable, BadRequestException, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comments.repository';

import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { Ipagination, pagination } from 'src/shared/utils/pagination';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { FollowersService } from '../followers/followers.service';
import { CommentCreateDto } from './dto/comment-create.dto';
import { Comment } from './comment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../users/user.entity';
import { CommentUpdateDto } from './dto/comment-update.dto';
import { PostsGateway } from 'src/sockets/posts.gateway';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentRepository) private readonly commentRepository: CommentRepository,
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
        private readonly followersService: FollowersService,
        private readonly postsGateway: PostsGateway) {}



    public async getPostComments(loggedUserId: number, postId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<any> {
        const post = await this.postsService.getPostById(postId);
        const user = await this.usersService.getUserById(post.userId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, user.id)) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const {offset, limit} = <Ipagination>pagination(strictPaginationGetFilterDto.page, strictPaginationGetFilterDto.pageSize);
        try {
            const comments = await this.commentRepository.createQueryBuilder('comment')
                    .where('comment.post = :postId', {postId: postId})
                    .leftJoinAndSelect('comment.user', 'user')
                    .skip(offset)
                    .take(limit)
                    .getMany();

            comments.forEach( (comment: any )=> {
                const user = {...comment.user};
                delete comment.user;
                comment.userFirstName = user.firstName;
                comment.userLastName = user.lastName;
                comment.userProfileImgUrl = user.profileImgUrl;
            });
            return comments;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async writeComment(user: User, postId: number, commentCreateDto: CommentCreateDto): Promise<Comment> {
        const loggedUserId = user.id;
        const post = await this.postsService.getPostById(postId);
        const userOfPost = await this.usersService.getUserById(post.userId);
        if(!userOfPost.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, userOfPost.id)) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const createdComment = await this.commentRepository.createComment(user, post, commentCreateDto);
        const commentAuthor = await this.usersService.getUserById(createdComment.userId);
        await this.postsService.updatePostCommentCounter(postId, 'WRITE');
        this.postsGateway.commentCreated(user.id, {...createdComment, userFirstName: commentAuthor.firstName, userLastName: commentAuthor.lastName});
        return createdComment;
    }


    public async getCommentById(commentId: number): Promise<Comment> {
        try {
            const comment =  await this.commentRepository.findOne({ id: commentId });
            if(!comment) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "COMMENT_NOT_EXISTS"};
            }
            return comment;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async deleteComment(loggedUserId: number, postId: number, commentId: number): Promise<any> {
        try {
            const deletedComment: DeleteResult = await this.commentRepository.createQueryBuilder()
                                                        .delete()
                                                        .from(Comment)
                                                        .where("id = :id AND post = :postId AND user = :userId", { id: commentId, postId: postId, userId: loggedUserId })
                                                        .execute();
            if(!deletedComment.affected) {  
                throw {statusCode: HttpStatus.NOT_FOUND, message: "COMMENT_NOT_EXISTS"};
            }
            await this.postsService.updatePostCommentCounter(postId, 'DELETE');
            const deletedCommentAuthor = await this.usersService.getUserById(loggedUserId);
            this.postsGateway.commentDeleted(loggedUserId, {
                userFirstName: deletedCommentAuthor.firstName, 
                userLastName: deletedCommentAuthor.lastName, 
                userId: deletedCommentAuthor.id, 
                postId: postId, 
                commentId: commentId
            });
            return deletedComment.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async updateComment(loggedUserId: number, commentId: number, commentUpdateDto: CommentUpdateDto): Promise<Comment> {
        try {
            const updatedComment: UpdateResult = await this.commentRepository.update({id: commentId, userId: loggedUserId}, commentUpdateDto);
            if(!updatedComment.affected) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "COMMENT_NOT_EXISTS"};
            }
            this.postsGateway.commentUpdated(loggedUserId, updatedComment.raw);
            return updatedComment.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }


    public async updateCommentReactCounter(commentId: number, action: string): Promise<void> {
        try {
            if(action === "REACT") {
                await this.commentRepository.increment({id: commentId}, 'reactsCount', 1);
            } else if(action === "UNREACT") {
                await this.commentRepository.decrement({id: commentId}, 'reactsCount', 1);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    } 

    public async updateCommentReplyCounter(commentId: number, action: string): Promise<void> {
        try {
            if(action === "WRITE") {
                await this.commentRepository.increment({id: commentId}, 'repliesCount', 1);
            } else if(action === "DELETE") {
                await this.commentRepository.decrement({id: commentId}, 'repliesCount', 1);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


}
