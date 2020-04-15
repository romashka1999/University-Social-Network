import { Injectable, BadRequestException, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comments.repository';

import { StrictPaginationGetFilterDto } from 'src/shared/strict-pagination-get-filter.dto';
import { Ipagination, pagination } from 'src/shared/pagination';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { FollowersService } from '../followers/followers.service';
import { CommentCreateDto } from './dto/comment-create.dto';
import { Comment } from './comment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentRepository) private readonly commentRepository: CommentRepository,
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
        private readonly followersService: FollowersService) {}



    public async getPostComments(loggedUserId: number, postId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<any> {
        const post = await this.postsService.getPostById(postId);
        const user = await this.usersService.getUserById(post.userId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, user.id)) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const {offset, limit} = <Ipagination>pagination(strictPaginationGetFilterDto.page, strictPaginationGetFilterDto.pageSize);
        let comments;
        try {
            comments = await this.commentRepository.createQueryBuilder('comment')
                    .where('comment.postId = :posId', {posId: postId})
                    .skip(offset)
                    .take(limit)
                    .getMany();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        const commentsUserIds = comments.map(comment => comment.userId);
        const users = await this.usersService.getUsersByIds(commentsUserIds);

        const memoUserDP = {};
        return comments.map( comment => {
            if(memoUserDP[comment.userId]) {
                return {...memoUserDP[comment.userId], ...comment}
            } else {
                const user: any = users.find( (user: any) => user.user_id === comment.userId);
                const userId = user.user_id;
                delete user.user_id;
                memoUserDP[userId] = user;
                return {...memoUserDP[userId], ...comment}
            }   
        });
    }


    public async writeComment(loggedUserId: number, postId: number, commentCreateDto: CommentCreateDto): Promise<Comment> {
        const post = await this.postsService.getPostById(postId);
        const user = await this.usersService.getUserById(post.userId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, user.id)) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        return await this.commentRepository.createComment(loggedUserId, postId, commentCreateDto);
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

    public async deleteComment(loggedUserId: number, commentId: number): Promise<any> {
        try {
            const deletedComment: DeleteResult = await this.commentRepository.delete({id: commentId, userId: loggedUserId});
            if(!deletedComment.affected) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "COMMENT_NOT_EXISTS"};
            }
            return deletedComment.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async updateComment(loggedUserId: number, commentId: number, commentCreateDto: CommentCreateDto): Promise<Comment> {
        try {
            const updatedComment: UpdateResult =  await this.commentRepository
                .createQueryBuilder('comment')
                .update(Comment)
                .set(commentCreateDto)
                .where("comment.id = :id AND comment.userId = :userId", { id: commentId, userId: loggedUserId })
                .execute();
            if(!updatedComment.affected) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "COMMENT_NOT_EXISTS"};
            }
            return updatedComment.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }


}
