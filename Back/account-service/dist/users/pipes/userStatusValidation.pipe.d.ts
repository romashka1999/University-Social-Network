import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class UserStatusValidaionPipe implements PipeTransform {
    private readonly allowedUserStatuses;
    transform(value: any, metadata: ArgumentMetadata): any;
    isValidStatus(status: any): boolean;
}
