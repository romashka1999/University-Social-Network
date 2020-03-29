import { IsOptional, IsIn, IsInt, IsString, IsPositive } from "class-validator";

import { UserStatus } from "../entities/user.entity";


export class GetUsersFilterDto {
    @IsOptional()
    @IsIn([UserStatus.VERIFIED, UserStatus.VERIFICATION_PENDING, UserStatus.UNVERIFIED])
    status: UserStatus;

    @IsString()
    search: string;

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