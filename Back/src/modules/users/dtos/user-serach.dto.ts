import { IsNumber, IsNotEmpty, IsString } from "class-validator"

export class UserSearchDto {
    @IsString()
    @IsNotEmpty()
    search: string;

    @IsNumber()
    @IsNotEmpty()
    page: number;

    @IsNumber()
    @IsNotEmpty()
    pageSize: number;
}