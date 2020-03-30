import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { TranslationsService } from './translations.service';
import { TranslationRepository } from './translation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationRepository])],
  providers: [TranslationsService]
})
export class TranslationsModule {}
