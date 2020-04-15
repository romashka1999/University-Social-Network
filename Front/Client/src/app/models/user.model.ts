

export interface GetUser_Response {
    message: string;
    data: Array<GetUserData>
}

export interface GetUserData {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string,
    profileImgUrl: string | null,
    coverImageUrl: string | null,
    email: string,
    username: string,
    phoneNumber: string,
    publicUser: boolean,
    status: string,
    followersCount: number,
    followingsCount: number
}