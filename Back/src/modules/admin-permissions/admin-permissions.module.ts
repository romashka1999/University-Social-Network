import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminPermissionsService } from './admin-permissions.service';
import { AuthModule } from '../auth/auth.module';
import { AdminPermissionRepository } from './admin-permission.repository';
import { AdminPermissionsController } from './admin-permissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPermissionRepository]), forwardRef( () => AuthModule)],
  controllers: [AdminPermissionsController],
  providers: [AdminPermissionsService],
  exports: [
    AdminPermissionsService, 
    TypeOrmModule
  ]
})
export class AdminPermissionsModule {}
