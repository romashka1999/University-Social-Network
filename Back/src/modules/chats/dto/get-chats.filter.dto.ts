import { IsNumberString, IsNotEmpty } from "class-validator"

export class GetChatsFilterDto {
    @IsNumberString()
    @IsNotEmpty()
    page: number

    @IsNumberString()
    @IsNotEmpty()
    pageSize: number
}