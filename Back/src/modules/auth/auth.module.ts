import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


import { AdminAuthController } from "./adminAuth.controller";
import { UserAuthController } from "./userAuth.controller";
import { AdminService } from "../admins/services/admin.service";
import { UserService } from "../users/user.service";


import * as config from 'config';
const jwtConfig = config.get('jwt');


@Module({
    imports: [
        PassportModule.register({
            
        }),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn //seconds
            }
        })
    ],
    controllers: [AdminAuthController, UserAuthController],
    providers: [AdminService, UserService]
})
export class AuthModule {}