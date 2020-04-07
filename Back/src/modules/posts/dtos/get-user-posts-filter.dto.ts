import { IsNotEmpty, IsNumberString } from "class-validator"

export class GetUserPostsFilterDto {
    @IsNumberString()
    @IsNotEmpty()
    page: number

    @IsNumberString()
    @IsNotEmpty()
    pageSize: number
}