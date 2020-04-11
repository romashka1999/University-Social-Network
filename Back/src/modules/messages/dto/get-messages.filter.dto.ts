import { IsNumberString, IsNotEmpty } from "class-validator"

export class GetMessagesFilterDto {
    @IsNumberString()
    @IsNotEmpty()
    page: number

    @IsNumberString()
    @IsNotEmpty()
    pageSize: number
}