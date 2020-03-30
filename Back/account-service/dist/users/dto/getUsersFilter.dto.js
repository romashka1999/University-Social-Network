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
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../user.entity");
class GetUsersFilterDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([user_entity_1.Status.VERIFIED, user_entity_1.Status.VERIFICATION_PENDING, user_entity_1.Status.UNVERIFIED]),
    __metadata("design:type", String)
], GetUsersFilterDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetUsersFilterDto.prototype, "search", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetUsersFilterDto.prototype, "order", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], GetUsersFilterDto.prototype, "page", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], GetUsersFilterDto.prototype, "pageSize", void 0);
exports.GetUsersFilterDto = GetUsersFilterDto;
//# sourceMappingURL=getUsersFilter.dto.js.map