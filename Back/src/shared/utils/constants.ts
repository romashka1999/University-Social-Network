import { RequestMethod } from "src/modules/admin-permissions/admin-permission.entity";

export const AMINISTRATOR_PERMISSIONS: Array<{url: string, requestMethod: RequestMethod}> = [
    {url: '/backOffice/admins', requestMethod: RequestMethod.GET},
    {url: '/backOffice/admins', requestMethod: RequestMethod.POST},
    {url: '/backOffice/admins', requestMethod: RequestMethod.PATCH},
    {url: '/backOffice/admins', requestMethod: RequestMethod.DELETE},
    {url: '/backOffice/adminRoles', requestMethod: RequestMethod.GET},
    {url: '/backOffice/adminRoles', requestMethod: RequestMethod.POST},
    {url: '/backOffice/adminRoles', requestMethod: RequestMethod.PUT},
    {url: '/backOffice/adminRoles', requestMethod: RequestMethod.DELETE},
    {url: '/backOffice/adminPermissions', requestMethod: RequestMethod.GET}
];
