import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';

import * as config from 'config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
      storage: diskStorage({
        // destination: './uploads', 
        filename: (req, file, cb) => { 
          console.log(req.files[0].fieldname);
          return cb(null, file.filename + '.jpg')
        }
      }),
      limits: {
        fileSize: 1000000000
      }
    }),
    AdminsModule,
    forwardRef(() => UsersModule)
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
