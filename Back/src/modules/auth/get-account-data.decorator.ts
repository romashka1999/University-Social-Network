import { createParamDecorator, BadRequestException } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req) => {
    if(req.args[0].user.admin) {
        throw new BadRequestException("YOU_ARE_ADMIN_NOT_USER");
    }
    const user = req.args[0].user.data;
    return user;
});

export const GetAdmin = createParamDecorator((data, req) => {
    if(!req.user.admin) {
        throw new BadRequestException("YOU_ARE_USER_NOT_ADMIN");
    }
    const admin = req.user.data;
    return admin;
})