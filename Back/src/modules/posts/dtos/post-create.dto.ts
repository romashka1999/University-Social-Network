import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostCreateDto {

    @ApiProperty({
        type: String,
        description: 'content of post',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}