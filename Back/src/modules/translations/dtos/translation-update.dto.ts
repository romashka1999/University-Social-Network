import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class TranslationUpdateDto {

    @ApiProperty({
        type: String,
        description: 'variable of Translation',
        required: false
    })
    @IsString()
    variable: string;

    @ApiProperty({
        type: String,
        description: 'KA of Translation',
        required: false
    })
    @IsString()
    KA: string;

    @ApiProperty({
        type: String,
        description: 'EN of Translation',
        required: false
    })
    @IsString()
    EN: string;

    @ApiProperty({
        type: String,
        description: 'RU of Translation',
        required: false
    })
    @IsString()
    RU: string;
}