import { Injectable, BadRequestException, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReplyRepository } from './reply.repository';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { FollowersService } from '../followers/followers.service';
import { PostsGateway } from 'src/sockets/posts.gateway';
import { Ipagination, pagination } from 'src/shared/utils/pagination';
import { User } from '../users/user.entity';
import { ReplyCreateDto } from './dto/reply-create.dto';
import { CommentsService } from '../comments/comments.service';
import { Reply } from './reply.entity';
import { ReplyUpdateDto } from './dto/reply-update.dto';
import { UpdateResult, DeleteResult } from 'typeorm';


@Injectable()
export class RepliesService {

    constructor(
        @InjectRepository(ReplyRepository) private readonly replyRepository: ReplyRepository,
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
        private readonly followersService: FollowersService,
        private readonly commentsService: CommentsService,
        private readonly postsGateway: PostsGateway) {}



    public async getCommentReplies(loggedUserId: number, postId: number, commentId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<any> {
        const post = await this.postsService.getPostById(postId);
        const user = await this.usersService.getUserById(post.userId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, user.id)) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const {offset, limit} = <Ipagination>pagination(strictPaginationGetFilterDto.page, strictPaginationGetFilterDto.pageSize);
        try {
            const replies = await this.replyRepository.createQueryBuilder('reply')
                    .where('reply.comment = :commentId', {commentId: commentId})
                    .leftJoinAndSelect('reply.user', 'user')
                    .skip(offset)
                    .take(limit)
                    .getMany();

            replies.forEach( (reply: any )=> {
                const user = {...reply.user};
                delete reply.user;
                reply.userFirstName = user.firstName;
                reply.userLastName = user.lastName;
                reply.userProfileImgUrl = user.profileImgUrl;
            });
            return replies;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async writeReply(user: User, postId: number, commentId: number,  replyCreateDto: ReplyCreateDto): Promise<Reply> {
        const loggedUserId = user.id;
        const post = await this.postsService.getPostById(postId);
        const userOfPost = await this.usersService.getUserById(post.userId);
        if(!userOfPost.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, userOfPost.id)) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const comment = await this.commentsService.getCommentById(commentId);
        const createdReply = await this.replyRepository.createReply(user, comment, replyCreateDto);
        await this.commentsService.updateCommentReplyCounter(commentId, 'WRITE');
        this.postsGateway.replyCreated(user.id, createdReply);
        return createdReply;
    }


    public async getReplyById(replyId: number): Promise<Reply> {
        try {
            const reply =  await this.replyRepository.findOne({ id: replyId });
            if(!reply) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "REPLY_NOT_EXISTS"};
            }
            return reply;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async deleteReply(loggedUserId: number, commentId: number, replyId: number): Promise<any> {
        try {
            const deletedReply: DeleteResult = await this.replyRepository.createQueryBuilder()
                                                        .delete()
                                                        .from(Reply)
                                                        .where("id = :id AND comment = :commentId AND user = :userId", { id: replyId, commentId: commentId, userId: loggedUserId })
                                                        .execute();
            if(!deletedReply.affected) {  
                throw {statusCode: HttpStatus.NOT_FOUND, message: "REPLY_NOT_EXISTS"};
            }
            await this.commentsService.updateCommentReplyCounter(replyId, 'DELETE');
            this.postsGateway.replyDeleted(loggedUserId);
            return deletedReply.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async updateReply(loggedUserId: number, replyId: number, replyUpdateDto: ReplyUpdateDto): Promise<Reply> {
        try {
            const updatedReply: UpdateResult = await this.replyRepository.update({id: replyId, userId: loggedUserId}, replyUpdateDto);
            if(!updatedReply.affected) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "REPLY_NOT_EXISTS"};
            }
            this.postsGateway.replyUpdated(loggedUserId, updatedReply.raw);
            return updatedReply.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }


    public async updateReplyReactCounter(replyId: number, action: string): Promise<void> {
        try {
            if(action === "REACT") {
                await this.replyRepository.increment({id: replyId}, 'reactsCount', 1);
            } else if(action === "UNREACT") {
                await this.replyRepository.decrement({id: replyId}, 'reactsCount', 1);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    } 


}
