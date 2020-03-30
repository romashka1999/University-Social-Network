import { IsOptional, IsNumber } from 'class-validator';

export class GetUsersFilterDto {

    @IsNumber()
    @IsOptional()
    age: number

}