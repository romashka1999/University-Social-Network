import { IsNotEmpty, IsNumberString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class GetUserPostsFilterDto {

    @ApiProperty({
        type: IsNumberString,
        description: 'page for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    page: number

    @ApiProperty({
        type: IsNumberString,
        description: 'pageSize for pagination',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    pageSize: number
}