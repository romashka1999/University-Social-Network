import { IsString, IsNotEmpty } from "class-validator";

export class PostCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;
}