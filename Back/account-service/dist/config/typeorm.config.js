"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.tpeOrmConfig = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path_1.join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true,
    logging: true
};
//# sourceMappingURL=typeorm.config.js.map