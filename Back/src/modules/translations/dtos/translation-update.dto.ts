import { IsString } from "class-validator";


export class TranslationUpdateDto {
    @IsString()
    variable: string;

    @IsString()
    KA: string;

    @IsString()
    EN: string;

    @IsString()
    RU: string;
}