import { PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from "@nestjs/common";


export class UserEmailValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if(typeof value !== 'string') {
            throw new HttpException("EMAIL_MUST_BE_STRING", HttpStatus.NOT_ACCEPTABLE)
        }

        if(!this.emailIsValid(value)) {
            throw new HttpException("EMAIL_IS_NOT_VALID", HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private emailIsValid(password: string): boolean {
        // future implement password regex ...
        return password ? true: false
    }
}