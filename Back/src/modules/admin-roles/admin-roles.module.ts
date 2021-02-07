import { Module, forwardRef } from '@nestjs/common';
import { AdminRolesService } from './admin-roles.service';
import { AdminRolesController } from './admin-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRoleRepository } from './admin-role.repository';
import { AuthModule } from '../auth/auth.module';
import { AdminPermissionsModule } from '../admin-permissions/admin-permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRoleRepository]), forwardRef(() =>AuthModule), AdminPermissionsModule],
  controllers: [AdminRolesController],
  providers: [AdminRolesService],
  exports: [
    AdminRolesService,
    TypeOrmModule
  ]
})
export class AdminRolesModule {}
