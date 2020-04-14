import { IsNumber, IsNotEmpty } from "class-validator"

export class StrictPaginationGetFilterDto {
    @IsNumber()
    @IsNotEmpty()
    page: number

    @IsNumber()
    @IsNotEmpty()
    pageSize: number
}