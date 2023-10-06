"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
var TOKEN = {
    EXPIRE_TOKEN_TIME: process.env.EXPIRE_TOKEN_MINUTES || "1d",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "secret",
};
exports.default = TOKEN;
//# sourceMappingURL=TokenConstants.js.map