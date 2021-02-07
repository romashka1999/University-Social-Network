export interface MessageModel {
  message: string;
  data: MessageDataModel[];
}
export interface MessageDataModel {
  imageUrl: string | null;
  _id: string;
  chatId: string;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
