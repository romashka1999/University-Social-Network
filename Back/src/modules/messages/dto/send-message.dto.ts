import { IsString, IsNotEmpty } from "class-validator"

export class SendMessageDto {
    @IsString()
    @IsNotEmpty()
    content: number

}