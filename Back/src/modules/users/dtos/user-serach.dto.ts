import { IsNotEmpty, IsNumberString, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class UserSearchDto {

    @ApiProperty({
        type: String,
        description: 'search string for user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    search: string;

    @ApiProperty({
        type: Number,
        description: 'age of user',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        type: Number,
        description: 'age of user',
        required: true
    })
    @IsNumberString()
    @IsNotEmpty()
    pageSize: number;
}