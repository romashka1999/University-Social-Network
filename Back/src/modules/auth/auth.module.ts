import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


import { AdminAuthController } from "./controllers/adminAuth.controller";
import { UserAuthController } from "./controllers/userAuth.controller";
import { AdminService } from "../admins/services/admin.service";
import { UserService } from "../users/services/user.service";


import * as config from 'config';
import { JwtStrategyAdmin, JwtStrategyUser } from "./services/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminRepository } from "../admins/repositories/admin.repository";
import { UserRepository } from "../users/repositories/user.repository";
const jwtConfig = config.get('jwt');


@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository, UserRepository]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn //seconds
            }
        })
    ],
    controllers: [AdminAuthController, UserAuthController],
    providers: [AdminService, UserService, JwtStrategyAdmin, JwtStrategyUser],
    exports: [
        JwtStrategyAdmin,
        JwtStrategyUser,
        PassportModule,
        JwtModule
    ]
})
export class AuthModule {}