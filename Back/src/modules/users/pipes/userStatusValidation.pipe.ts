import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common"
import { UserStatus } from "../entities/user.entity"



export class UserStatusValidaionPipe implements PipeTransform{

    private readonly allowedUserStatuses = [
        UserStatus.VERIFIED,
        UserStatus.VERIFICATION_PENDING,
        UserStatus.UNVERIFIED
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