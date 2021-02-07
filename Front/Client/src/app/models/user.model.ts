// tslint:disable-next-line:class-name
export interface GetUser_Response {
    message: string;
    data: GetUserData;
}

export interface GetUserData {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    profileImgUrl: string | null;
    coverImageUrl: string | null;
    email: string;
    username: string;
    phoneNumber: string;
    publicUser: boolean;
    status: string;
    followersCount: number;
    followingsCount: number;
}
export class UserSearchModel {
  message: string;
  data: UserSearch[];
}

export interface UserSearch {
  user_profileImgUrl: string;
  user_lastName: string;
  user_firstName: string;
  user_id?: number;
}
