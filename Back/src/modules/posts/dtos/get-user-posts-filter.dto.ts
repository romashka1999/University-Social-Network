import { IsNotEmpty, IsNumberString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class GetUserPostsFilterDto {

    @ApiProperty({
        type: Number,
        description: 'page for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    page: number

    @ApiProperty({
        type: Number,
        description: 'pageSize for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    pageSize: number
}