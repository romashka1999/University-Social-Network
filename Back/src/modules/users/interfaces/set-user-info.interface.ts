import { UserUpdateDto } from "../dtos/user-update.dto";

export class SetUserInfoInterface extends UserUpdateDto{
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    salt?: string;
    followersCount?: number;
    followingsCount?: number;
}