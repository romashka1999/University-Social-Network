import { Module } from '@nestjs/common';
import { AdminRolesService } from './admin-roles.service';

@Module({
  providers: [AdminRolesService]
})
export class AdminRolesModule {}
