import { PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from "@nestjs/common";


export class UserPasswordValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if(!this.passwordIsValid(value)) {
            throw new HttpException('password is not valid', HttpStatus.BAD_REQUEST);
        }

        return value;
    }

    private passwordIsValid(password: string): boolean {
        return password ? true: false
    }
}