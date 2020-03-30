import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { AdminRepository } from '../admins/admin.repository';
import { JwtUserStrategy, JwtAdmintrategy } from './jwt.strategy';

import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn //seconds
      }
    }),
    TypeOrmModule.forFeature([UserRepository, AdminRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtUserStrategy,
    JwtAdmintrategy
  ],
  exports: [
    JwtUserStrategy,
    JwtAdmintrategy,
    PassportModule
  ]
})
export class AuthModule {}
