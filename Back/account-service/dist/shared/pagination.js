"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = (page, pageSize) => {
    const offset = page * pageSize;
    const limit = pageSize;
    return {
        offset,
        limit
    };
};
//# sourceMappingURL=pagination.js.map