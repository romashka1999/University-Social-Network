import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

    public createTranslation(translationCreateDto: TranslationCreateDto): Promise<boolean> {
        return this.translationRepository.createTranslation(translationCreateDto);
    }

    public updateTranslation(id: number, translationUpdateDto: TranslationUpdateDto): Promise<boolean> {
        return this.translationRepository.updateTranslation(id, translationUpdateDto);
    }

    public async deleteTranslation(id: number): Promise<boolean> {
        try {
            const deletedTranslation: DeleteResult = await this.translationRepository.delete({id: id});

            if(!deletedTranslation.affected) {
                throw new NotFoundException("TRANSLATION_NOT_EXISTS");
            }

            return true;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
