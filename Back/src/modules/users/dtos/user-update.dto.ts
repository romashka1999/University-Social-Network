import { IsString, IsEnum, IsOptional, IsDateString } from "class-validator";

import { UserGender } from "../user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {

    @ApiProperty({
        type: String,
        description: 'firstName of user',
        required: false
    })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        type: String,
        description: 'lastName of user',
        required: false
    })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        type: Date,
        description: 'birthDate of user',
        required: false
    })
    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @ApiProperty({
        name: 'gender',
        enum: UserGender,
        description: 'gender of user',
        required: false
    })
    @IsEnum(UserGender)
    @IsOptional()
    gender?: UserGender;
}