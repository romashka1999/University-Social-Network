import { IsString, IsOptional, IsBooleanString } from "class-validator";

export class PostUpdateDto {
    @IsString()
    @IsOptional()
    content: string;

    @IsBooleanString()
    @IsOptional()
    publicPost: boolean;
}