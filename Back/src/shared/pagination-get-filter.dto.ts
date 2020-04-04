import { IsNumber, IsOptional } from "class-validator"

export class PaginationGetFilterDto {
    @IsNumber()
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    pageSize: number
}