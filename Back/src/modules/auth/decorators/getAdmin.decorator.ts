import { createParamDecorator } from "@nestjs/common";


export const GetAdmin = createParamDecorator((data, req) => {
    return req.admin;
})