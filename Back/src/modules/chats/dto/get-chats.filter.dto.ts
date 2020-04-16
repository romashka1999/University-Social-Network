import { IsNumberString, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class GetChatsFilterDto {

    @ApiProperty({
        type: IsNumberString,
        description: 'page for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        type: IsNumberString,
        description: 'pageSize for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    pageSize: number;
}