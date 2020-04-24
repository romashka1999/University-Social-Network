import { Injectable, BadGatewayException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ReplyReactRepository } from "./reply-react.repository";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { FollowersService } from "../followers/followers.service";
import { StrictPaginationGetFilterDto } from "src/shared/dtos/strict-pagination-get-filter.dto";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";
import { PostsGateway } from "src/sockets/posts.gateway";
import { ReplyReact } from "./reply-react.entity";
import { CommentsService } from "../comments/comments.service";
import { RepliesService } from "../replies/replies.service";


@Injectable()
export class ReplyReactsService {

    constructor(
        @InjectRepository(ReplyReactRepository) private readonly replyReactRepository: ReplyReactRepository,
        private readonly repliesService: RepliesService,
        private readonly commentsService: CommentsService,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService, 
        private readonly followersService: FollowersService,
        private readonly postsGateway: PostsGateway) {}

        
    public async getUserReactsByReplyId(loggedUserId: number, postId: number, commentId: number, replyId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        const commentReacts = await this.replyReactRepository.getUserReactsByReplyId(replyId, strictPaginationGetFilterDto);
        const commentReactsUserIdsArray = commentReacts.map(postReact => postReact.userId);
        if(commentReactsUserIdsArray.length < 1) {
            return [];
        }
        return await this.usersService.getUsersByIds(commentReactsUserIdsArray);
    }


    public async reactReply(user: User, postId: number, commentId: number, replyId: number): Promise<any> {
        const loggedUserId = user.id;
        const post = await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            const reply = await this.repliesService.getReplyById(replyId);
            const relyReact = new ReplyReact();
            relyReact.reply = reply
            relyReact.user = user;
            const createdReplyReact = await relyReact.save();
            await this.repliesService.updateReplyReactCounter(replyId, "REACT");
            const data = {
                commentReactId: createdReplyReact.id,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImgUrl: user.profileImgUrl
            }
            this.postsGateway.replyReacted(user.id, data);
            return data;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("REACT_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async unReactReply(loggedUserId: number, postId: number, commentId: number, replyId: number): Promise<boolean> {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            const deletedReact = await this.replyReactRepository.createQueryBuilder()
                                        .delete()
                                        .from(ReplyReact)
                                        .where("reply = :replyId AND user = :userId", { replyId: replyId, userId: loggedUserId })
                                        .execute();
            if(!deletedReact.affected) {
                throw new NotFoundException("REACT_NOT_EXISTS");
            }
            await this.repliesService.updateReplyReactCounter(replyId, "UNREACT");
            this.postsGateway.replyUnReacted(loggedUserId, true);
            return true;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }

    private async checkPostByUserIdAndPostId(loggedUserId: number, postId: number): Promise<Post> {
        const post = await this.postsService.getPostById(postId);
        const postUserId = post.userId;

        const user = await this.usersService.getUserById(postUserId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, postUserId)) {
                throw new BadGatewayException("USER_IS_NOT_PUBLIC");
            }
        }
        return post;
    }


    // public async checkReact(loggedUserId: number, postId: number): Promise<boolean> {
    //     try {
    //         const postReact = await this.postReactRepository.createQueryBuilder('postReact')
    //                 .where('postReact.post = :postId AND postReact.user = :userId', {postId: postId, userId: loggedUserId})
    //                 .getOne();
    //         return postReact ? true : false;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }

}