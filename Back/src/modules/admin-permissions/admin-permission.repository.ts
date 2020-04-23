import { Repository, EntityRepository } from "typeorm";

import { AdminPermission } from "./admin-permission.entity";

@EntityRepository(AdminPermission)
export class AdminPermissionRepository extends Repository<AdminPermission> {

    
}