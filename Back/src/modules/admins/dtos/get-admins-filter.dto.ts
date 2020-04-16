import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';

export class GetAdminsFilterDto extends PaginationGetFilterDto{

    @ApiProperty({
        type: String,
        description: 'email of admin',
        required: false
    })
    @IsString()
    @IsOptional()
    email: string;
}