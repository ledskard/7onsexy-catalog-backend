"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePassword = void 0;
function deletePassword(data) {
    delete data.tempPassword;
    delete data.password;
    return data;
}
exports.deletePassword = deletePassword;
//# sourceMappingURL=DeletePassword.js.map