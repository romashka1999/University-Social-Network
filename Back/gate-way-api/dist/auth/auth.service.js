"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AuthService = class AuthService {
    constructor() {
        this.axios = axios_1.default.create({ url: process.env.ACCOUNT_SERVICE_HOST });
    }
    async signUpUser(signUpUserDto) {
        try {
            const response = await this.axios.post('/createUser', signUpUserDto);
            return response;
        }
        catch (error) {
            return new common_1.BadRequestException(error);
        }
    }
    async signInUser(signInUserDto) {
        try {
            const response = await this.axios.post('/getUserByWhere', signInUserDto);
            return response;
        }
        catch (error) {
            return new common_1.BadRequestException(error);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map