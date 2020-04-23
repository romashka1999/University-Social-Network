import { Repository, EntityRepository } from "typeorm";

import { ReplyReact } from "./reply-react.entity";
import { Ipagination, pagination } from "src/shared/utils/pagination";
import { InternalServerErrorException } from "@nestjs/common";
import { StrictPaginationGetFilterDto } from "src/shared/dtos/strict-pagination-get-filter.dto";

@EntityRepository(ReplyReact)
export class ReplyReactRepository extends Repository<ReplyReact> {

    public async getUserReactsByReplyId(replyId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Array<ReplyReact>> {
        const { page, pageSize } = strictPaginationGetFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            return await this.createQueryBuilder('replyReact')
                .where("replyReact.reply = :replyId", { replyId: replyId })
                .skip(offset)
                .take(limit)
                .getMany()
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}