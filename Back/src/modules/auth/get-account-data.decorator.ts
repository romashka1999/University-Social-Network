import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req) => {
    return req.user;
});

export const GetAdmin = createParamDecorator((data, req) => {
    return req.admin;
})