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
var FeatureFlags_1 = require("./FeatureFlags");
var Button_1 = require("./Button");
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
        (0, typeorm_1.Column)({ name: "instagram", nullable: true }),
        __metadata("design:type", String)
    ], Model.prototype, "instagram", void 0);
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
        (0, typeorm_1.Column)({ name: "tiktok", nullable: true }),
        __metadata("design:type", String)
    ], Model.prototype, "tiktok", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "twitter", nullable: true }),
        __metadata("design:type", String)
    ], Model.prototype, "twitter", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "profile_image_id", nullable: true }),
        __metadata("design:type", String)
    ], Model.prototype, "profileImageId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Image_1.Image; }, function (image) { return image.model; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Model.prototype, "images", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return FeatureFlags_1.FeatureFlags; }, function (featureFlag) { return featureFlag.models; }, { cascade: true }),
        (0, typeorm_1.JoinTable)({
            name: "user_feature_flags",
            joinColumn: {
                name: "user_id",
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "feature_flag_id",
                referencedColumnName: "id"
            }
        }),
        __metadata("design:type", Array)
    ], Model.prototype, "featureFlags", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Button_1.Button; }, function (button) { return button.model; }, { cascade: true, eager: true }),
        __metadata("design:type", Array)
    ], Model.prototype, "buttons", void 0);
    Model = __decorate([
        (0, typeorm_1.Entity)("model")
    ], Model);
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map