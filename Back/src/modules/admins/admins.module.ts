import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { AdminRepository } from './repositories/admin.repository';
import { AdminRoleService } from './services/adminRole.service';
import { AdminPermissionService } from './services/adminPermission.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository])
    ],
    controllers: [AdminController],
    providers: [AdminService, AdminRoleService, AdminPermissionService],
})
export class AdminsModule {}
