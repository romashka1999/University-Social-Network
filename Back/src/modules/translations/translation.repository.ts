import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { ConflictException, InternalServerErrorException, HttpStatus, HttpException } from "@nestjs/common";


import { Translation } from "./translation.entity";
import { TranslationCreateDto } from "./dtos/translation-create.dto";
import { TranslationUpdateDto } from "./dtos/translation-update.dto";
import { Ipagination, pagination } from "src/shared/utils/pagination";
import { PaginationGetFilterDto } from "src/shared/dtos/pagination-get-filter.dto";

@EntityRepository(Translation)
export class TranslationRepository extends Repository<Translation> {
    
    
    public async createTranslation(translationCreateDto: TranslationCreateDto): Promise<Translation> {
        const { variable, KA, EN, RU } = translationCreateDto;

        const translation = new Translation();
        translation.variable = variable;
        translation.KA = KA;
        translation.EN = EN;
        translation.RU = RU;
        
        try {
            const createdTranslation = await translation.save();
            return createdTranslation;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("VARIABLE_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async updateTranslation(id: number, translationUpdateDto: TranslationUpdateDto): Promise<Translation> {
        try {
            const updatedTranslation: UpdateResult = await this
                .createQueryBuilder('translation')
                .update(Translation)
                .set(translationUpdateDto)
                .where("id = :id", { id: id })
                .execute();
            if(!updatedTranslation.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "TRANSLATION_NOT_EXISTS"};
            }
            return updatedTranslation.raw;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("VARIABLE_ALREADY_EXISTS");
            } else {
                if(error.statusCode) {
                    throw new HttpException(error.message, error.statusCode);
                } else {
                    throw new InternalServerErrorException(error);
                }
            }
        }
    }

    public async getTranslations(paginationGetFilterDto: PaginationGetFilterDto): Promise<Array<Translation>> {
        const { page, pageSize } = paginationGetFilterDto;

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