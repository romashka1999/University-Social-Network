import { IsString, IsNotEmpty } from "class-validator";


export class TranslationCreateDto {
    @IsString()
    @IsNotEmpty()
    variable: string;

    @IsString()
    @IsNotEmpty()
    KA: string;

    @IsString()
    @IsNotEmpty()
    EN: string;

    @IsString()
    @IsNotEmpty()
    RU: string;
}