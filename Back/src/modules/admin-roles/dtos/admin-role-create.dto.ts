import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdminRoleCreateDto {

    @ApiProperty({
        type: String,
        description: 'role of admin role',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    role: string;
}