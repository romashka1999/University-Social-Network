import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbCFG = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbCFG.type,
    host: dbCFG.host,
    port: dbCFG.port,
    username: dbCFG.username,
    password: dbCFG.password,
    database: dbCFG.database,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: dbCFG.synchronize,
    logging: dbCFG.logging
}