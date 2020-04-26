import { createParamDecorator, BadRequestException } from "@nestjs/common";
import { RequestMethod, AdminPermission } from "../admin-permissions/admin-permission.entity";

export const GetUser = createParamDecorator((data, req) => {
    if(req.args[0].user.admin) {
        throw new BadRequestException("YOU_ARE_ADMIN_NOT_USER");
    }
    const user = req.args[0].user.data;
    return user;
});

export const GetAdmin = createParamDecorator((data, req) => {
    if(!req.args[0].user.admin) {
        throw new BadRequestException("YOU_ARE_USER_NOT_ADMIN");
    }
    const currentUrl = req.args[0].originalUrl;
    const currentMethod = req.args[0].method;
    const admin = req.args[0].user.data;
    const adminPermissions: AdminPermission[] = admin.adminRole.permissions;
    console.log(adminPermissions);
    //checkAminPermission(currentUrl, currentMethod, adminPermissions);
    return admin;
});




function checkAminPermission(currentUrl: string, currentMethod: RequestMethod, permissionsList: Array<AdminPermission>) {
    if(permissionsList.length < 1) {
        throw new BadRequestException('PERMISSION_ERROR');
    } 
    console.log('currentUrl', currentUrl);
    console.log('currentMethod', currentMethod);
    console.log('chacda');
    let adminHasPemission: boolean = false;
    for(let permission of permissionsList) {
        console.log('iteracia---', permission);
        console.log('url', permission.url.startsWith(currentUrl));
        console.log('method', permission.requestMethod === currentMethod);
        if(permission.url.startsWith(currentUrl) && permission.requestMethod === currentMethod) {
            console.log('ifshia');
            adminHasPemission = true;
            break;
        }
    }
    if(!adminHasPemission) {
        throw new BadRequestException('PERMISSION_ERROR');
    }
}


