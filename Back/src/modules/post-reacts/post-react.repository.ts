import { Repository, EntityRepository } from "typeorm";

import { PostReact } from "./post-react.entity";
import { PaginationGetFilterDto } from "src/shared/pagination-get-filter.dto";
import { Ipagination, pagination } from "src/shared/pagination";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(PostReact)
export class PostReactRepository extends Repository<PostReact> {

    public async getUserReactsByPostId(postId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Array<PostReact>> {
        const { page, pageSize } = paginationGetFilterDto;

        const query = this.createQueryBuilder('postReact');

        query.where("postReact.postId = :postId", { postId: postId });

        if (page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        query.select('postReact.userId');

        try {
            const postReacts = await query.getMany();
            return postReacts;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}