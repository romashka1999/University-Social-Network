import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: dbConfig.synchronize,
    logging: dbConfig.logging,
    extra: {
        ssl: {
            rejectUnauthorized : false,
      }
    },
}