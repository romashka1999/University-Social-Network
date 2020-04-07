import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class UserSearchDto {
    @IsString()
    @IsNotEmpty()
    search: string;

    @IsNumberString()
    @IsNotEmpty()
    page: number;

    @IsNumberString()
    @IsNotEmpty()
    pageSize: number;
}