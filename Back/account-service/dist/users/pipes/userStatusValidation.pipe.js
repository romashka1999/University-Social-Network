"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user.entity");
class UserStatusValidaionPipe {
    constructor() {
        this.allowedUserStatuses = [
            user_entity_1.Status.VERIFIED,
            user_entity_1.Status.VERIFICATION_PENDING,
            user_entity_1.Status.VERIFIED
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isValidStatus(value)) {
            throw new common_1.BadRequestException('invalid status');
        }
        return value;
    }
    isValidStatus(status) {
        const index = this.allowedUserStatuses.indexOf(status);
        return index !== -1;
    }
}
exports.UserStatusValidaionPipe = UserStatusValidaionPipe;
//# sourceMappingURL=userStatusValidation.pipe.js.map