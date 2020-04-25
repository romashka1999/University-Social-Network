import { Repository, EntityRepository } from "typeorm";

import { AdminRole } from "./admin-role.entity";
import { AdminRoleCreateDto } from "./dtos/admin-role-create.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(AdminRole)
export class AdminRoleRepository extends Repository<AdminRole> {

    public async createAdminRole(adminRoleCreateDto: AdminRoleCreateDto, adminPermissions): Promise<AdminRole> {
        const { role } = adminRoleCreateDto;

        const adminRole = new AdminRole();
        adminRole.role = role;
        adminRole.permissions = adminPermissions;
        try {
            const createdAdminRole = await adminRole.save();
            return createdAdminRole;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("ADMINROLE_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}