import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

import { AdminPermission } from "./admin-permission.entity";
import { PaginationGetFilterDto } from "src/shared/dtos/pagination-get-filter.dto";
import { Ipagination, pagination } from "src/shared/utils/pagination";

@EntityRepository(AdminPermission)
export class AdminPermissionRepository extends Repository<AdminPermission> {

    public async getAdminPermissions(paginationGetFilterDto: PaginationGetFilterDto) : Promise<Array<AdminPermission>>{
        const { page, pageSize } = paginationGetFilterDto;

        const query = this.createQueryBuilder();

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        try {
            const adminPermissions = await query.getMany();
            return adminPermissions;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}