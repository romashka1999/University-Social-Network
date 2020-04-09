import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsService } from './admins.service';
import { AdminRepository } from './admin.repository';
import { AdminsController } from './admins.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository]), forwardRef(() => AuthModule)],
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
