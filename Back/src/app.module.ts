import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AppGateway } from './app.gateway';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { PublicModule } from './controllers/public/public.module';
import { BackOfficeModule } from './controllers/back-office/back-office.module';


 

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PublicModule,
    BackOfficeModule
  ],
  providers: [/*AppGateway*/]
})
export class AppModule {}
