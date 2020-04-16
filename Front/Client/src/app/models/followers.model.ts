export interface FollowersModel {
  message: string;
  data: FollowersDataModel
}
export interface FollowersDataModel {
  userId: number;
  followerId: number;
  id: number;
  createDate: Date | string;
}
export interface IsFollowed {
  message: string;
  data: boolean;
}
