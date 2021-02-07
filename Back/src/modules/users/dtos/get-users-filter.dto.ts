import { IsOptional, IsNumberString } from 'class-validator';
import { PaginationGetFilterDto } from 'src/shared/dtos/pagination-get-filter.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetUsersFilterDto extends PaginationGetFilterDto {

    @ApiProperty({
        type: Number,
        description: 'age of user',
        required: false
    })
    @IsNumberString()
    @IsOptional()
    age: number
}