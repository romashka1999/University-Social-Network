import { Injectable } from "@nestjs/common";

import { FollowersService } from "./followers.service";



@Injectable()
export class FollowersServiceCheck {

    constructor(private readonly followersService: FollowersService) {}

    public async checkFollowing(loggedUserId: number, userId: number) {
        return await this.followersService.checkFollowing(loggedUserId, userId);
    }

}
