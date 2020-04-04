import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';

import * as config from 'config';
import { MulterModule } from '@nestjs/platform-express';
import { AdminsModule } from '../admins/admins.module';
import { UsersModule } from '../users/users.module';

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
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 10000000
      }
    }),
    AdminsModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
    
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
