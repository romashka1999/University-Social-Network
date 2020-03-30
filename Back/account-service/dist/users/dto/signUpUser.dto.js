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
class SignUpUserDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "firstname", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "lastname", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "ursername", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsPositive(),
    class_validator_1.Min(8),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SignUpUserDto.prototype, "age", void 0);
exports.SignUpUserDto = SignUpUserDto;
//# sourceMappingURL=signUpUser.dto.js.map