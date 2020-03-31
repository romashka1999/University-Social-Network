import { IsOptional, IsString } from 'class-validator';
import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';

export class GetAdminsFilterDto extends PaginationGetFilterDto{
    @IsString()
    @IsOptional()
    email: string;
}