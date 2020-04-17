import { Injectable, BadGatewayException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { PostReactRepository } from "./post-react.repository";
import { PaginationGetFilterDto } from "src/shared/pagination-get-filter.dto";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { FollowersService } from "../followers/followers.service";


@Injectable()
export class PostReactsService {

    constructor(
        @InjectRepository(PostReactRepository) private readonly postReactRepository: PostReactRepository,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService, 
        private readonly followersService: FollowersService) {}

        
    public async getUserReactsByPostId(loggedUserId: number, postId: number, paginationGetFilterDto: PaginationGetFilterDto) {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        const postReacts = await this.postReactRepository.getUserReactsByPostId(postId, paginationGetFilterDto);
        const postReactsUserIdsArray = postReacts.map(postReact => postReact.userId);

        return await this.usersService.getUsersByIds(postReactsUserIdsArray);
    }


    public async reactPost(loggedUserId: number, postId: number): Promise<any> {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            await this.postReactRepository.create({userId: loggedUserId, postId: postId});
            await this.postsService.updatePostReactCounter(postId, "REACT");
            const user = await this.usersService.getUserById(loggedUserId);
            const data = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImgUrl: user.profileImgUrl
            }
            return data;
        } catch (error) {
            if(error.code === '23505') {//duplicate username 
                throw new ConflictException("REACT_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async unReactPost(loggedUserId: number, postId: number): Promise<boolean> {
        await this.checkPostByUserIdAndPostId(loggedUserId, postId);
        try {
            const deletedReact = await this.postReactRepository.delete(postId);

            if(!deletedReact.affected) {
                throw new NotFoundException("REACT_NOT_EXISTS");
            }
            await this.postsService.updatePostReactCounter(postId, "UNREACT");
            return true;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }

    private async checkPostByUserIdAndPostId(loggedUserId: number, postId: number) {
        const post = await this.postsService.getPostById(postId);
        const postUserId = post.userId;

        const user = await this.usersService.getUserById(postUserId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, postUserId)) {
                throw new BadGatewayException("USER_IS_NOT_PUBLIC");
            }
        }
    }


    public async checkReact(loggedUserId: number, postId: number): Promise<boolean> {
        try {
            const postReact = await this.postReactRepository.find({postId: postId, userId: loggedUserId});
            return postReact ? true : false;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}