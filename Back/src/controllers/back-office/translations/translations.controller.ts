import { Controller, Param, ParseIntPipe, Body, Get, Put, Query, ValidationPipe, Delete, Post } from '@nestjs/common';

import { TranslationsService } from 'src/modules/translations/translations.service';
import { GetTranslationsFilterDto } from 'src/modules/translations/dtos/get-translations-filter.dto';
import { Translation } from 'src/modules/translations/translation.entity';
import { TranslationCreateDto } from 'src/modules/translations/dtos/translation-create.dto';
import { TranslationUpdateDto } from 'src/modules/translations/dtos/translation-update.dto';

@Controller('translations')
export class TranslationsController {

    constructor(private readonly translationsService: TranslationsService) {}

    @Get()
    public getTranslations(@Query(ValidationPipe) getTranslationsFilterDto: GetTranslationsFilterDto): Promise<Array<Translation>> {
        return this.translationsService.getTranslations(getTranslationsFilterDto);
    }

    @Post()
    public createTranslation(@Body(ValidationPipe) translationCreateDto: TranslationCreateDto): Promise<boolean> {
        return this.translationsService.createTranslation(translationCreateDto);
    }

    @Put('/:id')
    public updateTranslation(
        @Param('id', ParseIntPipe) id: number, 
        @Body(ValidationPipe) translationUpdateDto: TranslationUpdateDto): Promise<boolean> {
        return this.translationsService.updateTranslation(id, translationUpdateDto);
    }

    @Delete('/:id')
    public async deleteTranslation(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.translationsService.deleteTranslation(id);
    }
}
