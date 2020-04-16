import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class TranslationCreateDto {

    @ApiProperty({
        type: String,
        description: 'variable of Translation',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    variable: string;

    @ApiProperty({
        type: String,
        description: 'KA of Translation',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    KA: string;

    @ApiProperty({
        type: String,
        description: 'EN of Translation',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    EN: string;

    @ApiProperty({
        type: String,
        description: 'RU of Translation',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    RU: string;
}