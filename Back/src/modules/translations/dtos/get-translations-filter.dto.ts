import { IsOptional, IsNumber } from 'class-validator';

export class GetTranslationsFilterDto {

    @IsNumber()
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    pageSize: number
}