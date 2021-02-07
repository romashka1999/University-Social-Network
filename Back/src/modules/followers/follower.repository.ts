import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";


import { Follower } from "./follower.entity";
import { PaginationGetFilterDto } from "src/shared/dtos/pagination-get-filter.dto";
import { Ipagination, pagination } from "src/shared/utils/pagination";


@EntityRepository(Follower)
export class FollowerRepository extends Repository<Follower> {

    public async getFollowersByUserId(userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Follower[]> {
        const { page, pageSize } = paginationGetFilterDto;

        const query = this.createQueryBuilder('follower');

        query.where("follower.userId = :userId", { userId: userId });

        if (page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        query.select('follower.followerId');

        try {
            const followers = await query.getMany();
            return followers;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async getFolloweesByUserId(userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Follower[]> {

        const { page, pageSize } = paginationGetFilterDto;

        const query = this.createQueryBuilder('follower');

        query.where("follower.followerId = :userId", { userId: userId });

        if (page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        query.select('follower.userId');

        try {
            const followers = await query.getMany();
            return followers;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}