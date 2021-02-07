import {GetCommentDataModel} from './comment.model';

export interface GetPost_Response {
    message: string;
    data: GetPostData[];
}

export interface CheckPost {
    message: string;
    data: boolean;
}

export interface GetPostData {
    comments?: GetCommentDataModel[];
    commentsCount: number;
    sharesCount: number;
    id: number;
    content: string;
    hidden: boolean;
    createDate: string;
    updateDate: string;
    reactsCount: number;
    userId: number;
    user_firstName?: string;
    user_lastName?: string;
    user_profileImgUrl?: string | null;
}

