import { IsString, IsDate, IsEnum } from "class-validator";

import { UserGender } from "../user.entity";
export class UserUpdateDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsDate()
    birthDate: Date;

    @IsEnum(UserGender)
    gender: UserGender;
}