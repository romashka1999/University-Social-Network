import { IsNumberString, IsOptional } from "class-validator"

export class PaginationGetFilterDto {
    @IsNumberString()
    @IsOptional()
    page: number;

    @IsNumberString()
    @IsOptional()
    pageSize: number;
}