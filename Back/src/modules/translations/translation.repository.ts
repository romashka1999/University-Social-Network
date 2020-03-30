import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";


import { Translation } from "./translation.entity";
import { TranslationCreateDto } from "./dtos/translation-create.dto";
import { TranslationUpdateDto } from "./dtos/translation-update.dto";
import { GetTranslationsFilterDto } from "./dtos/get-translations-filter.dto";
import { Ipagination, pagination } from "src/shared/pagination";

@EntityRepository(Translation)
export class TranslationRepository extends Repository<Translation> {
    
    
    public async createTranslation(translationCreateDto: TranslationCreateDto): Promise<boolean> {
        const { variable, KA, EN, RU } = translationCreateDto;

        const translation = new Translation();
        translation.variable = variable;
        translation.KA = KA;
        translation.EN = EN;
        translation.RU = RU;

        try {
            await translation.save();
        } catch (error) {
            if(error.code === '23505') {//duplicate username 
                throw new ConflictException("VARIABLE_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        return true;
    }

    public async updateTranslation(id: number, translationUpdateDto: TranslationUpdateDto): Promise<boolean> {
        try {
            const updatedTranslation: UpdateResult = await this
                .createQueryBuilder('translation')
                .update(Translation)
                .set(translationUpdateDto)
                .where("id = :id", { id: id })
                .execute();
            if(!updatedTranslation.affected) {
                throw new NotFoundException("TRANSLATION_NOT_EXISTS");
            }
            return true;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getTranslations(getTranslationsFilterDto: GetTranslationsFilterDto): Promise<Array<Translation>> {
        const { page, pageSize } = getTranslationsFilterDto;

        const query = this.createQueryBuilder('translation');

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        try {
            const translations = await query.getMany();
            return translations;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}