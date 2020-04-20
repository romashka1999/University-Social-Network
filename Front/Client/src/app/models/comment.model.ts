import {GetPostData} from './post.model';

export interface GetCommentModel {
  message: string;
  data: GetCommentDataModel[];
}

export interface GetCommentDataModel {
  id: number;
  content: string;
  hidden: boolean;
  createDate: string | Date;
  updateDate: string | Date;
  postId: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userProfileImgUrl: string | null;
}

export interface PostCommentModel {
  message: string;
  data: PostCommentDataModel[];
}
export interface PostCommentDataModel {
  post: GetPostData[];
  id: number;
  content: string;
  hidden: boolean;
  createDate: string | Date;
  updateDate: string | Date;
  postId: number;
  userId: number;
}

