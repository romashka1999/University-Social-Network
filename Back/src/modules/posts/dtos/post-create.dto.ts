import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class PostCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsOptional()
    publicPost: boolean;
}