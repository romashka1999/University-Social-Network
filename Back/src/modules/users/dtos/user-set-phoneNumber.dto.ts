import { IsString, IsNotEmpty } from "class-validator";


export class UserSetPhoneNumberDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}