import { Controller, Param, ParseIntPipe, Body, Get, Put, Query, ValidationPipe, Delete, Post } from '@nestjs/common';

import { TranslationsService } from 'src/modules/translations/translations.service';
import { GetTranslationsFilterDto } from 'src/modules/translations/dtos/get-translations-filter.dto';
import { Translation } from 'src/modules/translations/translation.entity';
import { TranslationCreateDto } from 'src/modules/translations/dtos/translation-create.dto';
import { TranslationUpdateDto } from 'src/modules/translations/dtos/translation-update.dto';
import { ResponseCreator } from 'src/shared/response-creator';

@Controller('translations')
export class TranslationsController {

    constructor(private readonly translationsService: TranslationsService) {}

    @Get()
    public async getTranslations(@Query(ValidationPipe) getTranslationsFilterDto: GetTranslationsFilterDto): Promise<ResponseCreator> {
        const gotData = await this.translationsService.getTranslations(getTranslationsFilterDto);
        return new ResponseCreator('TRANSLATIONS_GOT', gotData);
    }

    @Post()
    public async createTranslation(@Body(ValidationPipe) translationCreateDto: TranslationCreateDto): Promise<ResponseCreator> {
        const createdData = await this.translationsService.createTranslation(translationCreateDto);
        return new ResponseCreator('TRANSLATION_CREATED', createdData);
    }

    @Put('/:id')
    public async updateTranslation(
        @Param('id', ParseIntPipe) id: number, 
        @Body(ValidationPipe) translationUpdateDto: TranslationUpdateDto): Promise<ResponseCreator> {
         const updatedData = await this.translationsService.updateTranslation(id, translationUpdateDto);
         return new ResponseCreator('TRANSLATION_UPDATED', updatedData);
    }

    @Delete('/:id')
    public async deleteTranslation(@Param('id', ParseIntPipe) id: number): Promise<ResponseCreator> {
        const deletedData = await this.translationsService.deleteTranslation(id);
        return new ResponseCreator('TRANSLATION_DELETED', deletedData);
    }
}
