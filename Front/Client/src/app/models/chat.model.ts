export interface ChatModel {
  message: string;
  data: ChatDataModel[];
}
export interface ChatDataModel {
  users: ChatUsers[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ChatUsers {
  firstName: string;
  lastname: string;
  prifileImgUrl: string | null;
  userId: number;
}
