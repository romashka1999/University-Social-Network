import { IsString, IsEnum, IsOptional, IsDateString } from "class-validator";

import { UserGender } from "../user.entity";

export class UserUpdateDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @IsEnum(UserGender)
    @IsOptional()
    gender?: UserGender;
}