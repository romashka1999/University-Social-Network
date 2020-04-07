import { IsString, IsNotEmpty, IsOptional, IsBooleanString} from "class-validator";

export class PostCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBooleanString()
    @IsOptional()
    publicPost: boolean;
}