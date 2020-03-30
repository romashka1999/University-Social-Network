"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const password_1 = require("./helpers/password");
const pagination_1 = require("../shared/pagination");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(signUpDto) {
        const { password } = signUpDto;
        const { salt, hashedPassword } = await password_1.hashPassword(password);
        const user = new user_entity_1.User();
        user.firstname = signUpDto.firstname;
        user.lastname = signUpDto.lastname;
        user.email = signUpDto.email;
        user.username = signUpDto.ursername;
        user.age = signUpDto.age || null;
        user.password = hashedPassword;
        user.salt = salt;
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('usarname already exists');
            }
            else {
                throw new common_1.InternalServerErrorException(error);
            }
        }
        return true;
    }
    async signIn(signInDto) {
        const { accountIdentity, password } = signInDto;
        try {
            let user = await this.findOne({
                where: {
                    username: accountIdentity
                }
            });
            if (!user)
                user = await this.findOne({
                    where: {
                        email: accountIdentity
                    }
                });
            if (user && await user.validatePassword(password)) {
                if (!user || user.password !== password) {
                    return user;
                }
                else {
                    return null;
                }
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getUsers(getUsersFilterDto) {
        const { status, search, order, page, pageSize } = getUsersFilterDto;
        const query = this.createQueryBuilder('user');
        if (order === 'ASC') {
            query.addOrderBy('ASC');
        }
        else if (order === 'DESC') {
            query.addOrderBy('DESC');
        }
        if (page && pageSize) {
            const { offset, limit } = pagination_1.pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }
        if (status) {
            query.andWhere('user.status = :status', { status: status });
        }
        if (search) {
            query.andWhere('(user.firstname LIKE :search OR user.lastname LIKE :search)', { search: `%${search}%` });
        }
        try {
            const users = await query.getMany();
            return users;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map