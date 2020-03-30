import { Module } from '@nestjs/common';
import { AdminPermissionsController } from './admin-permissions.controller';
import { AdminPermissionsService } from './admin-permissions.service';

@Module({
  controllers: [AdminPermissionsController],
  providers: [AdminPermissionsService]
})
export class AdminPermissionsModule {}
