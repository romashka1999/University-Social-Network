import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common"
import { Status } from "../user.entity"



export class UserStatusValidaionPipe implements PipeTransform{

    private readonly allowedUserStatuses = [
        Status.VERIFIED,
        Status.VERIFICATION_PENDING,
        Status.VERIFIED
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!this.isValidStatus(value)) {
            throw new BadRequestException('invalid status');
        }

        return value;
    }

    isValidStatus(status: any) {
        const index = this.allowedUserStatuses.indexOf(status); // if not exists returns -1
        return index !== -1;
    }

}