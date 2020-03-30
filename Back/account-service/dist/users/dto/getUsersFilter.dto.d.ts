import { Status } from "../user.entity";
export declare class GetUsersFilterDto {
    status: Status;
    search: string;
    order: string;
    page: number;
    pageSize: number;
}
