export class ResponseCreator {

    private message: string;
    private data: any;

    constructor(message: string, data: any) {
        this.message = message;
        this.data = data;
    }
}