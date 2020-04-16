import { IsString, IsOptional, IsBooleanString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostUpdateDto {

    @ApiProperty({
        type: String,
        description: 'content of post',
        required: true
    })
    @IsString()
    @IsOptional()
    content: string;

    @ApiProperty({
        type: IsBooleanString,
        description: 'publicPost of post',
        required: false
    })
    @IsBooleanString()
    @IsOptional()
    publicPost: boolean;
}