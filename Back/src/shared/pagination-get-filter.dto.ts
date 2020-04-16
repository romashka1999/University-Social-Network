import { IsNumberString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class PaginationGetFilterDto {

    @ApiProperty({
        type: Number,
        description: 'page for pagination',
        required: false
    })
    @IsNumberString()
    @IsOptional()
    page: number;

    @ApiProperty({
        type: Number,
        description: 'pageSize for pagination',
        required: false
    })
    @IsNumberString()
    @IsOptional()
    pageSize: number;
}