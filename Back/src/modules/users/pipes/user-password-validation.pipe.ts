import { PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from "@nestjs/common";


export class UserPasswordValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if(typeof value !== 'string') {
            throw new HttpException("PASSWORD_MUST_BE_STRING", HttpStatus.NOT_ACCEPTABLE)
        }

        if(!this.passwordIsValid(value)) {
            throw new HttpException("PASSWORD_IS_NOT_VALID", HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private passwordIsValid(password: string): boolean {
        // future implement password regex ...
        return password ? true: false
    }
}