import { createParamDecorator, BadRequestException } from "@nestjs/common";
import { RequestMethod, AdminPermission } from "../admin-permissions/admin-permission.entity";
import { AMINISTRATOR_PERMISSIONS } from "src/shared/utils/constants";

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
    console.log(currentUrl);
    console.log(currentMethod);
    // checkAminPermission(currentUrl, req.args[0].user.data?.perrmissions);

    const admin = req.args[0].user.data;
    return admin;
});




function checkAminPermission(currentUrl: string, currentMethod: string, permissionsList: Array<AdminPermission>) {

    AMINISTRATOR_PERMISSIONS.forEach( (permission: {url: string, requestMethod: RequestMethod}) => {
        if(currentUrl.startsWith(permission.url) && currentMethod === permission.requestMethod) {
            const founded = permissionsList.find( (adminPerrmission) => {
                adminPerrmission.url === permission.url && adminPerrmission.requestMethod === permission.requestMethod
            });
            if(!founded) {
                throw new BadRequestException('PERMISSION_ERROR');
            }
        }
    });
}


