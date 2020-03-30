import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { AdminRolesModule } from './admin-roles/admin-roles.module';
import { AdminPermissionsModule } from './admin-permissions/admin-permissions.module';

@Module({
    imports: [
        AdminsModule,
        UsersModule,
        AdminRolesModule,
        AdminPermissionsModule
    ],
    exports: [
        AdminsModule,
        UsersModule,
        AdminRolesModule,
        AdminPermissionsModule
    ]
})
export class AdminModule {}
