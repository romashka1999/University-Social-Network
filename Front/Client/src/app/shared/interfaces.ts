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
  followersCount?: number;
  following?: boolean;
  followingsCount?: number;
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
    user_profileImgUrl: string;
    user_lastName: string;
    user_firstName: string;
    user_id?: number;
}
export interface Posts {
  content: string;
  createDate: Date;
  hidden: boolean;
  id: number;
  publicPost: boolean;
  updateDate: Date;
  userId: number;
}
