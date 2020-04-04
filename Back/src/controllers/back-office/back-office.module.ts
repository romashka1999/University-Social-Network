import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { AdminsController } from './admins/admins.controller';
import { AdminsModule } from 'src/modules/admins/admins.module';
import { TranslationsController } from './translations/translations.controller';
import { TranslationsModule } from 'src/modules/translations/translations.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdminsModule,
    TranslationsModule
  ],
  controllers: [
    UsersController, 
    AdminsController, 
    TranslationsController
  ]
})
export class BackOfficeModule {}
