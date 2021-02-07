import { Injectable, BadGatewayException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CommentReactRepository } from "./comment-react.repository";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { FollowersService } from "../followers/followers.service";
import { StrictPaginationGetFilterDto } from "src/shared/dtos/strict-pagination-get-filter.dto";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";
import { PostsGateway } from "src/sockets/posts.gateway";
import { CommentReact } from "./comment-react.entity";
import { CommentsService } from "../comments/comments.service";


@Injectable()
export class CommentReactsService {

    constructor(
        @InjectRepository(CommentReactRepository) private readonly commentReactRepository: CommentReactRepository,
        private readonly commentsService: CommentsService,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService, 
        private readonly followersService: FollowersService,
        private readonly postsGateway: PostsGateway) {}

        
    public async getUserReactsByCommentId(loggedUserId: number, postId: number, commentId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        const commentReacts = await this.commentReactRepository.getUserReactsByCommentId(commentId, strictPaginationGetFilterDto);
        const commentReactsUserIdsArray = commentReacts.map(postReact => postReact.userId);
        if(commentReactsUserIdsArray.length < 1) {
            return [];
        }
        return await this.usersService.getUsersByIds(commentReactsUserIdsArray);
    }


    public async reactComment(user: User, postId: number, commentId: number): Promise<any> {
        const loggedUserId = user.id;
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        const comment = await this.commentsService.getCommentById(commentId);
        try {
            const commentReact = new CommentReact();
            commentReact.user = user;
            commentReact.comment = comment;
            const reactedCommentReact = await commentReact.save();
            await this.commentsService.updateCommentReactCounter(postId, "REACT");
            const data = {
                commentReactId: reactedCommentReact.id,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImgUrl: user.profileImgUrl
            }
            this.postsGateway.commentReacted(user.id, data);
            return data;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("REACT_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async unReactComment(loggedUserId: number, postId: number, commentId: number): Promise<boolean> {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            const deletedReact = await this.commentReactRepository.createQueryBuilder()
                                        .delete()
                                        .from(CommentReact)
                                        .where("comment = :commentId AND user = :userId", { commentId: commentId, userId: loggedUserId })
                                        .execute();
            if(!deletedReact.affected) {
                throw new NotFoundException("REACT_NOT_EXISTS");
            }
            await this.commentsService.updateCommentReactCounter(postId, "UNREACT");
            this.postsGateway.commentUnReacted(loggedUserId, true);
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