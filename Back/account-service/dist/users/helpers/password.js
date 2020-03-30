"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs = require("bcryptjs");
exports.hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return {
        salt,
        hashedPassword
    };
};
exports.validatePassword = async (password, self) => {
    const hash = await bcryptjs.hash(password, self.salt);
    return hash === self.password;
};
//# sourceMappingURL=password.js.map