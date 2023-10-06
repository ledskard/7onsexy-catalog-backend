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
exports.Model = void 0;
var typeorm_1 = require("typeorm");
var Image_1 = require("./Image");
var Model = /** @class */ (function () {
    function Model() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
        __metadata("design:type", String)
    ], Model.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "username", unique: true }),
        __metadata("design:type", String)
    ], Model.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "location" }),
        __metadata("design:type", String)
    ], Model.prototype, "location", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "description" }),
        __metadata("design:type", String)
    ], Model.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "type" }),
        __metadata("design:type", String)
    ], Model.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "likes" }),
        __metadata("design:type", Number)
    ], Model.prototype, "likes", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "telegram_vip" }),
        __metadata("design:type", String)
    ], Model.prototype, "telegramVip", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "telegram_free" }),
        __metadata("design:type", String)
    ], Model.prototype, "telegramFree", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Image_1.Image; }, function (image) { return image.model; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Model.prototype, "images", void 0);
    Model = __decorate([
        (0, typeorm_1.Entity)("model")
    ], Model);
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map