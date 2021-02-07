import { Admin } from '../admins/admins.interface';

export interface AdminRole {
    id: number;
    role: string;
    admins: Admin[];
    permissions: AdminPermission[];
    createDate: string;
    updateDate: string;
}

export interface AdminPermission {
    id: number;
    url: string;
    requestMethod: string;
}