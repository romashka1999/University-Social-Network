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
}

export interface UserLogin {
  accountIdentity: string;
  password: string;
}

export interface StAuthResponse {
  accessToken: string;
  exp: string;
}
export interface Gender {
  value: string;
  viewValue: string;
}
