"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.SERVER_PORT);
    common_1.Logger.log(`gate-way-api listening to the port: ${process.env.SERVER_PORT}`, 'bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map