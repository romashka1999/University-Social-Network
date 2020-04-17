import { Repository, EntityRepository } from "typeorm";

import { PostReact } from "./post-react.entity";
import { Ipagination, pagination } from "src/shared/pagination";
import { InternalServerErrorException } from "@nestjs/common";
import { StrictPaginationGetFilterDto } from "src/shared/strict-pagination-get-filter.dto";

@EntityRepository(PostReact)
export class PostReactRepository extends Repository<PostReact> {

    public async getUserReactsByPostId(postId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Array<PostReact>> {
        const { page, pageSize } = strictPaginationGetFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            return await this.createQueryBuilder('postReact')
                .where("postReact.post = :postId", { postId: postId })
                .skip(offset)
                .take(limit)
                .getMany()
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}