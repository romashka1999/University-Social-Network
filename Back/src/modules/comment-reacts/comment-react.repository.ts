import { Repository, EntityRepository } from "typeorm";

import { CommentReact } from "./comment-react.entity";
import { Ipagination, pagination } from "src/shared/utils/pagination";
import { InternalServerErrorException } from "@nestjs/common";
import { StrictPaginationGetFilterDto } from "src/shared/dtos/strict-pagination-get-filter.dto";

@EntityRepository(CommentReact)
export class CommentReactRepository extends Repository<CommentReact> {

    public async getUserReactsByCommentId(commentId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Array<CommentReact>> {
        const { page, pageSize } = strictPaginationGetFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            return await this.createQueryBuilder('commentReact')
                .where("commentReact.comment = :postId", { commentId: commentId })
                .skip(offset)
                .take(limit)
                .getMany()
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}