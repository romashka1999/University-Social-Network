import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { TranslationsService } from './translations.service';
import { TranslationRepository } from './translation.repository';
import { TranslationsController } from './translations.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationRepository]), AuthModule],
  providers: [TranslationsService],
  controllers:[TranslationsController],
  exports: [TranslationsService]
})
export class TranslationsModule {}
