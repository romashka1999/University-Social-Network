import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';

@Module({
    imports: [
        TypeOrmModule.forFeature()
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminsModule {}
