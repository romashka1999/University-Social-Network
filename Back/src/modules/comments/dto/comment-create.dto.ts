import { IsString, IsNotEmpty } from "class-validator";

export class CommentCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;
}