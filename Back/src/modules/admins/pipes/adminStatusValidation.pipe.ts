import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { AdminStatus } from "../entities/admin.entity";



export class AdminStatusValidationPipe implements PipeTransform {

    readonly allowedAdminStatuses = [
        AdminStatus.ACTIVE,
        AdminStatus.BLOCKED
    ]

    transform(value: unknown, metadata: ArgumentMetadata) {
        if(typeof value === 'string') {
            value.toUpperCase();

            if(!this.isStatusValid(value)) {
                throw new BadRequestException("INVALID_ADMIN_STATUS");
            }
            
        } else {
            throw new BadRequestException("ADMIN_STATUS_MUST_BE_STRING");
        }
    }

    private isStatusValid(status: any) {
        const idx = this.allowedAdminStatuses.indexOf(status); //if not exist returns -1
        return idx !== -1;
    }
}