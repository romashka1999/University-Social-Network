import { Injectable, BadGatewayException } from "@nestjs/common";
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
        const post = await this.postsService.getPostById(postId);
        const postUserId = post.userId;

        const user = await this.usersService.getUserById(postUserId);
        if(!user.publicUser) {
            if(!await this.followersService.checkFollowing(loggedUserId, postUserId)) {
                throw new BadGatewayException("USER_IS_NOT_PUBLIC");
            }
        }
        const postReacts = await this.postReactRepository.getUserReactsByPostId(postId, paginationGetFilterDto);
        const postReactsUserIdsArray = postReacts.map(postReact => postReact.userId);

        return await this.usersService.getUsersByIds(postReactsUserIdsArray);
    }


}