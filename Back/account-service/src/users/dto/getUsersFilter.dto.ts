import { IsOptional, IsIn, IsInt, IsString, IsPositive } from "class-validator";

import { Status } from "../user.entity";


export class GetUsersFilterDto {
    @IsOptional()
    @IsIn([Status.VERIFIED, Status.VERIFICATION_PENDING, Status.UNVERIFIED])
    status: Status;

    @IsString()
    search: string;

    @IsString()
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