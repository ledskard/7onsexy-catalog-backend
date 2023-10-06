"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessError = void 0;
var ProcessError = function (res, err) {
    var code = err.status ? err.status : 500;
    var message = err.message ? err.message : 'Erro desconhecido';
    console.log(err);
    return res.status(code).send({ code: code, message: message });
};
exports.ProcessError = ProcessError;
//# sourceMappingURL=ProcessError.js.map