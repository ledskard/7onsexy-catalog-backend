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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var index_1 = require("typeorm/index");
var bcrypt_1 = require("bcrypt");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.loadTempPassword = function () {
        this.tempPassword = this.password;
    };
    User.prototype.hashPassword = function () {
        if (this.password !== this.tempPassword)
            this.password = (0, bcrypt_1.hashSync)(this.password, 8);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "username", unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "password" }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, index_1.AfterLoad)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "loadTempPassword", null);
    __decorate([
        (0, index_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "hashPassword", null);
    User = __decorate([
        (0, typeorm_1.Entity)("users")
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map