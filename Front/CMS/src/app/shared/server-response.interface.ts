export interface ServerReponse {
    message: string;
    data: any[] | any;
}

export interface ServerError{
    error: {
        error: string;
        message: string;
        statusCode: number;
    }
}