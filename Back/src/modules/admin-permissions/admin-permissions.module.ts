import { Module } from '@nestjs/common';
import { AdminPermissionsService } from './admin-permissions.service';

@Module({
  providers: [AdminPermissionsService]
})
export class AdminPermissionsModule {}
