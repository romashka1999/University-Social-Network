import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsService } from './admins.service';
import { AdminRepository } from './admin.repository';
import { AdminsController } from './admins.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminRolesModule } from '../admin-roles/admin-roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository]), forwardRef(() => AuthModule), forwardRef(() =>AdminRolesModule)],
  providers: [AdminsService],
  controllers: [
    AdminsController
  ],
  exports: [
    AdminsService, 
    TypeOrmModule
  ]
})
export class AdminsModule {}
