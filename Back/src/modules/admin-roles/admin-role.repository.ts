import { Repository, EntityRepository } from "typeorm";

import { AdminRole } from "./admin-role.entity";


@EntityRepository(AdminRole)
export class AdminRoleRepository extends Repository<AdminRole> {

    
}