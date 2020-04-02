import { IsString, IsDate, IsEnum, IsOptional } from "class-validator";

import { UserGender } from "../user.entity";

export class UserUpdateDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsDate()
    @IsOptional()
    birthDate?: Date;

    @IsEnum(UserGender)
    @IsOptional()
    gender?: UserGender;
}