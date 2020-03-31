import { IsOptional, IsNumber } from 'class-validator';
import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';

export class GetUsersFilterDto extends PaginationGetFilterDto {

    @IsNumber()
    @IsOptional()
    age: number
}