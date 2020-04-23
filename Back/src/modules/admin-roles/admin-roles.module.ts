import { Module } from '@nestjs/common';
import { AdminRolesService } from './admin-roles.service';
import { AdminRolesController } from './admin-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRoleRepository } from './admin-role.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRoleRepository]), AuthModule],
  controllers: [AdminRolesController],
  providers: [AdminRolesService],
  exports: [
    AdminRolesService,
    TypeOrmModule
  ]
})
export class AdminRolesModule {}
