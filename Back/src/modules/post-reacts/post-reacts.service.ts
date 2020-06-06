import { Injectable, BadGatewayException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { PostReactRepository } from "./post-react.repository";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { FollowersService } from "../followers/followers.service";
import { StrictPaginationGetFilterDto } from "src/shared/dtos/strict-pagination-get-filter.dto";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";
import { PostReact } from "./post-react.entity";
import { PostsGateway } from "src/sockets/posts.gateway";


@Injectable()
export class PostReactsService {

    constructor(
        @InjectRepository(PostReactRepository) private readonly postReactRepository: PostReactRepository,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService, 
        private readonly followersService: FollowersService,
        private readonly postsGateway: PostsGateway) {}

        
    public async getUserReactsByPostId(loggedUserId: number, postId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        const postReacts = await this.postReactRepository.getUserReactsByPostId(postId, strictPaginationGetFilterDto);
        const postReactsUserIdsArray = postReacts.map(postReact => postReact.userId);
        if(postReactsUserIdsArray.length < 1) {
            return [];
        }
        return await this.usersService.getUsersByIds(postReactsUserIdsArray);
    }


    public async reactPost(user: User, postId: number): Promise<any> {
        const loggedUserId = user.id;
        const post = await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            const postReact = new PostReact();
            postReact.user = user;
            postReact.post = post;
            const createdPostReact = await postReact.save();
            await this.postsService.updatePostReactCounter(postId, "REACT");
            const data = {
                postId: postId,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImgUrl: user.profileImgUrl
            }
            this.postsGateway.postReacted(user.id, data);
            return data;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("REACT_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async unReactPost(loggedUserId: number, postId: number): Promise<boolean> {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            const deletedReact = await this.postReactRepository.createQueryBuilder()
                                        .delete()
                                        .from(PostReact)
                                        .where("post = :postId AND user = :userId", { postId: postId, userId: loggedUserId })
                                        .execute();
            if(!deletedReact.affected) {
                throw new NotFoundException("REACT_NOT_EXISTS");
            }
            await this.postsService.updatePostReactCounter(postId, "UNREACT");
            const userUnreactor = await this.usersService.getUserById(loggedUserId);
            this.postsGateway.postUnReacted(loggedUserId, {
                userId: userUnreactor.id, 
                firstName: userUnreactor.firstName, 
                lastName: userUnreactor.lastName, 
                profileImgUrl: userUnreactor.profileImgUrl,
                postId: postId
            });
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


    public async checkReact(loggedUserId: number, postId: number): Promise<boolean> {
        try {
            const postReact = await this.postReactRepository.createQueryBuilder('postReact')
                    .where('postReact.post = :postId AND postReact.user = :userId', {postId: postId, userId: loggedUserId})
                    .getOne();
            return postReact ? true : false;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}