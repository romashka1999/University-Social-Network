import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';


import { TranslationRepository } from './translation.repository';
import { TranslationCreateDto } from './dtos/translation-create.dto';
import { TranslationUpdateDto } from './dtos/translation-update.dto';
import { GetTranslationsFilterDto } from './dtos/get-translations-filter.dto';
import { Translation } from './translation.entity';

@Injectable()
export class TranslationsService {

    constructor(@InjectRepository(TranslationRepository) private readonly translationRepository: TranslationRepository) {}

    public getTranslations(getTranslationsFilterDto: GetTranslationsFilterDto): Promise<Array<Translation>> {
        return this.translationRepository.getTranslations(getTranslationsFilterDto);
    }

    public createTranslation(translationCreateDto: TranslationCreateDto): Promise<Translation> {
        return this.translationRepository.createTranslation(translationCreateDto);
    }

    public updateTranslation(id: number, translationUpdateDto: TranslationUpdateDto): Promise<Translation> {
        return this.translationRepository.updateTranslation(id, translationUpdateDto);
    }

    public async deleteTranslation(id: number): Promise<Translation> {
        try {
            const deletedTranslation: DeleteResult = await this.translationRepository.delete({id: id});
            if(!deletedTranslation.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "TRANSLATION_NOT_EXISTS"};
            }
            return deletedTranslation.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}
