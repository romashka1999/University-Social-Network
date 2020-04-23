import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { Method } from "../admin-permission.entity";

export class AdminPermissionCreateDto {

    @ApiProperty({
        type: String,
        description: 'email of admin',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        name:'status',
        enum: Method,
        required: true
    })
    @IsEnum(Method)
    @IsNotEmpty()
    status: Method;
}