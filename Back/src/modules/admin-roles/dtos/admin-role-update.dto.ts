import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdminRoleUpdateDto {

    @ApiProperty({
        type: String,
        description: 'role of admin role',
        required: true
    })
    @IsString()
    role: string;

    @ApiProperty({
        type: String,
        description: 'permissionRoleIds of admin role',
        required: true
    })
    @IsArray()
    permissionRoleIds: number[]
}