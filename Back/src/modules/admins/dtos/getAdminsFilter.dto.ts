import { IsOptional, IsIn, IsString, IsInt, IsPositive } from "class-validator";

import { AdminStatus } from "../entities/admin.entity";

export class GetAdminsFilterDto {
    @IsOptional()
    @IsIn([AdminStatus.ACTIVE, AdminStatus.BLOCKED])
    status: AdminStatus;

    @IsString()
    email: string;

    @IsString()
    @IsIn(['ASC', 'DESC'])
    order: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    page: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    pageSize: number;
}