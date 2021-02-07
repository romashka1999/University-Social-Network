import { IsNumberString, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class GetMessagesFilterDto {
    
    @ApiProperty({
        type: Number,
        description: 'page for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        type: Number,
        description: 'pageSize for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    pageSize: number;
}