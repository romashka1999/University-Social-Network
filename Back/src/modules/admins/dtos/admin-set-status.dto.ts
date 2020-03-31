import { IsEnum, IsNotEmpty } from "class-validator";

import { AdminStatus } from "../admin.entity";

export class AdminSetStatusDto {
    @IsEnum(AdminStatus)
    @IsNotEmpty()
    status: AdminStatus;
}