import { Controller, Param, ParseIntPipe, Body, Get, Put, Query, ValidationPipe, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';


import { TranslationsService } from 'src/modules/translations/translations.service';
import { TranslationCreateDto } from 'src/modules/translations/dtos/translation-create.dto';
import { TranslationUpdateDto } from 'src/modules/translations/dtos/translation-update.dto';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { GetAdmin } from 'src/modules/auth/get-account-data.decorator';
import { Admin } from 'src/modules/admins/admin.entity';
import { PaginationGetFilterDto } from 'src/shared/dtos/pagination-get-filter.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('translations')
@Controller('backOffice/translations')
@UseGuards(AuthGuard())
export class TranslationsController {

    constructor(private readonly translationsService: TranslationsService) {}

    @Get()
    public async getTranslations(
        @GetAdmin() admin: Admin,
        @Query(ValidationPipe) paginationGetFilterDto: PaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.translationsService.getTranslations(paginationGetFilterDto);
        return new ResponseCreator('TRANSLATIONS_GOT', gotData);
    }

    @Post()
    public async createTranslation(
        @GetAdmin() admin: Admin,
        @Body(ValidationPipe) translationCreateDto: TranslationCreateDto): Promise<ResponseCreator> {
        const createdData = await this.translationsService.createTranslation(translationCreateDto);
        return new ResponseCreator('TRANSLATION_CREATED', createdData);
    }

    @Put('/:id')
    public async updateTranslation(
        @GetAdmin() admin: Admin,
        @Param('id', ParseIntPipe) id: number, 
        @Body(ValidationPipe) translationUpdateDto: TranslationUpdateDto): Promise<ResponseCreator> {
         const updatedData = await this.translationsService.updateTranslation(id, translationUpdateDto);
         return new ResponseCreator('TRANSLATION_UPDATED', updatedData);
    }

    @Delete('/:id')
    public async deleteTranslation(
        @GetAdmin() admin: Admin,
        @Param('id', ParseIntPipe) id: number): Promise<ResponseCreator> {
        const deletedData = await this.translationsService.deleteTranslation(id);
        return new ResponseCreator('TRANSLATION_DELETED', deletedData);
    }
}
