export interface ChatModel {
  message: string;
  data: ChatDataModel[];
}
export interface ChatDataModel {
  users: ChatUser[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatUser {
  firstName: string;
  lastname: string;
  prifileImgUrl: string | null;
  userId: number;
}
