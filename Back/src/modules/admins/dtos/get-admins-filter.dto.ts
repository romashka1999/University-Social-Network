import { IsOptional, IsNumber, IsString } from 'class-validator';

export class GetAdminsFilterDto {
    @IsString()
    @IsOptional()
    email: string;

    @IsNumber()
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    pageSize: number
}