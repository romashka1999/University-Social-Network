import { Method } from "src/modules/admin-permissions/admin-permission.entity";

export const AMINISTRATOR_PERMISSIONS: Array<{url: string, method: Method}> = [
    {url: 'backOffice/admins', method: Method.GET},
    {url: 'backOffice/admins', method: Method.POST},
    {url: 'backOffice/admins', method: Method.PATCH},
    {url: 'backOffice/admins', method: Method.DELETE}
];
