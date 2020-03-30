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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.findOne(id);
            if (!user) {
                throw new common_1.NotFoundException(`user with id - ${id} does not exist`);
            }
            return user;
        }
        catch (error) {
            if (!error.status) {
                throw new common_1.InternalServerErrorException(error);
            }
            throw error;
        }
    }
    async getUsers(getUsersFilterDto) {
        return this.userRepository.getUsers(getUsersFilterDto);
    }
    signUpUser(signUpUserDto) {
        return this.userRepository.signUp(signUpUserDto);
    }
    signInUser(signInUserDto) {
        return this.userRepository.signIn(signInUserDto);
    }
    async updateUserStatus(id, status) {
        const user = await this.getUserById(id);
        user.status = status;
        try {
            await user.save();
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteUserById(id) {
        try {
            const deletedUser = await this.userRepository.delete(id);
            if (!deletedUser.affected) {
                throw new common_1.NotFoundException(`user with id - ${id} does not exist`);
            }
            return true;
        }
        catch (error) {
            if (!error.status) {
                throw new common_1.InternalServerErrorException(error);
            }
            throw error;
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map