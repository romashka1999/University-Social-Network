import { IsNumber, IsNotEmpty } from "class-validator"

export class GetUserPostsFilterDto {
    @IsNumber()
    @IsNotEmpty()
    page: number

    @IsNumber()
    @IsNotEmpty()
    pageSize: number
}