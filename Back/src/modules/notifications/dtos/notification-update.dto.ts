import { IsBooleanString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NotificationUpdateDto {
    @ApiProperty({
        type: Boolean,
        description: 'viewed of notification',
        required: false
    })
    @IsBooleanString()
    @IsNotEmpty()
    viewed: boolean;
}