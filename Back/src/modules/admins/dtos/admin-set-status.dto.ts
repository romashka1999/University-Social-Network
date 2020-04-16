import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { AdminStatus } from "../admin.entity";

export class AdminSetStatusDto {

    @ApiProperty({
        name:'status',
        enum: AdminStatus,
        description: 'status of admin',
        required: true
    })
    @IsEnum(AdminStatus)
    @IsNotEmpty()
    status: AdminStatus;
}