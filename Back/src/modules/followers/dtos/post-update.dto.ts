import { IsString, IsOptional, IsBoolean } from "class-validator";

export class PostUpdateDto {
    @IsString()
    @IsOptional()
    content: string;

    @IsBoolean()
    @IsOptional()
    publicPost: boolean;
}