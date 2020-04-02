import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsService } from './admins.service';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  providers: [AdminsService],
  exports: [
    AdminsService, 
    TypeOrmModule
  ]
})
export class AdminsModule {}
