export interface Users {
  id?: number;
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: Date;
  publicUser?: boolean;
  status?: string;
  profileImgUrl?: null;
  coverImageUrl?: null;
}

export interface UserLogin {
  accountIdentity: string;
  password: string;
}

export interface Gender {
  value: string;
  viewValue: string;
}
export interface UserSearch {
    user_lastName: string;
    user_firstName: string;
    user_id?: number;
}
