"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImageRepository_1 = require("../repositories/ImageRepository");
var ModelRepository_1 = require("../repositories/ModelRepository");
var ErrorConstants_1 = require("../utils/constants/ErrorConstants");
var ImageService_1 = require("./ImageService");
var ModelService = /** @class */ (function () {
    function ModelService() {
        this.modelRepository = new ModelRepository_1.ModelRepository();
        this.imageRepository = new ImageRepository_1.ImageRepository();
        this.imageService = new ImageService_1.default();
    }
    ModelService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyAlreadyExistModel, model, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelRepository.findByUsername(data.username)];
                    case 1:
                        verifyAlreadyExistModel = _a.sent();
                        if (verifyAlreadyExistModel)
                            throw { status: ErrorConstants_1.ErrorStatus.bad_request, message: ErrorConstants_1.ErrorMessage.user_already_registered };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, Promise.all(data.images.map(function (image) { return __awaiter(_this, void 0, void 0, function () {
                                var imageResponse, error_2, profileImageResponse, savedImage, error_3;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(image === null || image === void 0 ? void 0 : image.base64)) return [3 /*break*/, 4];
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.imageService.saveFile(image)];
                                        case 2:
                                            imageResponse = _b.sent();
                                            image.url = imageResponse.imageUrl;
                                            image.name = imageResponse.fileName;
                                            delete image.base64;
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_2 = _b.sent();
                                            throw { code: ErrorConstants_1.ErrorStatus.internal_server_error, message: ErrorConstants_1.ErrorMessage.could_not_send_image };
                                        case 4:
                                            if (!((_a = data.profileImg) === null || _a === void 0 ? void 0 : _a.base64)) return [3 /*break*/, 9];
                                            _b.label = 5;
                                        case 5:
                                            _b.trys.push([5, 8, , 9]);
                                            return [4 /*yield*/, this.imageService.saveFile(data.profileImg)];
                                        case 6:
                                            profileImageResponse = _b.sent();
                                            data.profileImg.url = profileImageResponse.imageUrl;
                                            data.profileImg.name = profileImageResponse.fileName;
                                            delete data.profileImg.base64;
                                            return [4 /*yield*/, this.imageRepository.create(data.profileImg)];
                                        case 7:
                                            savedImage = _b.sent();
                                            data.profileImageId = savedImage.id;
                                            return [3 /*break*/, 9];
                                        case 8:
                                            error_3 = _b.sent();
                                            throw { code: ErrorConstants_1.ErrorStatus.internal_server_error, message: ErrorConstants_1.ErrorMessage.could_not_send_image };
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.modelRepository.create(data)];
                    case 4:
                        model = _a.sent();
                        return [2 /*return*/, model];
                    case 5:
                        error_1 = _a.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ModelService.prototype.findById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var model, profileImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelRepository.findByUsername(userId)];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, this.imageRepository.findById(model.profileImageId)];
                    case 2:
                        profileImage = _a.sent();
                        model.profileImage = profileImage;
                        if (!model)
                            throw { status: ErrorConstants_1.ErrorStatus.not_found, message: ErrorConstants_1.ErrorMessage.id_not_found };
                        return [2 /*return*/, model];
                }
            });
        });
    };
    ModelService.prototype.update = function (username, data) {
        return __awaiter(this, void 0, void 0, function () {
            var model, oldProfileImageId, oldProfileImageName, oldImages, modelToBeUpdated, modelUpdated, _i, oldImages_1, image;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelRepository.findByUsername(username)];
                    case 1:
                        model = _a.sent();
                        if (!model)
                            throw { status: ErrorConstants_1.ErrorStatus.not_found, message: ErrorConstants_1.ErrorMessage.id_not_found };
                        oldProfileImageId = null;
                        oldProfileImageName = null;
                        oldImages = [];
                        if (!data.images) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(data.images.map(function (image) { return __awaiter(_this, void 0, void 0, function () {
                                var imageResponse, error_4, profileImage, profileImageResponse, savedImage, error_5;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(image === null || image === void 0 ? void 0 : image.base64)) return [3 /*break*/, 4];
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.imageService.saveFile(image)];
                                        case 2:
                                            imageResponse = _b.sent();
                                            image.url = imageResponse.imageUrl;
                                            image.name = imageResponse.fileName;
                                            delete image.base64;
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_4 = _b.sent();
                                            throw { code: ErrorConstants_1.ErrorStatus.internal_server_error, message: ErrorConstants_1.ErrorMessage.could_not_send_image };
                                        case 4:
                                            if (!((_a = data.profileImg) === null || _a === void 0 ? void 0 : _a.base64)) return [3 /*break*/, 11];
                                            _b.label = 5;
                                        case 5:
                                            _b.trys.push([5, 10, , 11]);
                                            if (!model.profileImageId) return [3 /*break*/, 7];
                                            return [4 /*yield*/, this.imageRepository.findById(model.profileImageId)];
                                        case 6:
                                            profileImage = _b.sent();
                                            oldProfileImageId = profileImage.id;
                                            oldProfileImageName = profileImage.name;
                                            _b.label = 7;
                                        case 7: return [4 /*yield*/, this.imageService.saveFile(data.profileImg)];
                                        case 8:
                                            profileImageResponse = _b.sent();
                                            data.profileImg.url = profileImageResponse.imageUrl;
                                            data.profileImg.name = profileImageResponse.fileName;
                                            delete data.profileImg.base64;
                                            return [4 /*yield*/, this.imageRepository.create(data.profileImg)];
                                        case 9:
                                            savedImage = _b.sent();
                                            data.profileImageId = savedImage.id;
                                            return [3 /*break*/, 11];
                                        case 10:
                                            error_5 = _b.sent();
                                            throw { code: ErrorConstants_1.ErrorStatus.internal_server_error, message: ErrorConstants_1.ErrorMessage.could_not_send_image };
                                        case 11: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        modelToBeUpdated = Object.assign(model, data);
                        return [4 /*yield*/, this.modelRepository.save(modelToBeUpdated)];
                    case 4:
                        modelUpdated = _a.sent();
                        if (!(oldProfileImageId && oldProfileImageName)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.imageService.deleteFromS3({ id: oldProfileImageId, name: oldProfileImageName })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(oldImages.length > 0)) return [3 /*break*/, 10];
                        _i = 0, oldImages_1 = oldImages;
                        _a.label = 7;
                    case 7:
                        if (!(_i < oldImages_1.length)) return [3 /*break*/, 10];
                        image = oldImages_1[_i];
                        if (!(image.id && image.name)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.imageService.deleteFromS3(image.name)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, modelUpdated];
                }
            });
        });
    };
    ModelService.prototype.findAll = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var models, _i, models_1, model, profileImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelRepository.findAll(type)];
                    case 1:
                        models = _a.sent();
                        _i = 0, models_1 = models;
                        _a.label = 2;
                    case 2:
                        if (!(_i < models_1.length)) return [3 /*break*/, 5];
                        model = models_1[_i];
                        return [4 /*yield*/, this.imageRepository.findById(model.profileImageId)];
                    case 3:
                        profileImage = _a.sent();
                        model.profileImage = profileImage;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, models];
                }
            });
        });
    };
    ModelService.prototype.increaseLike = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var model, userToBeUpdated, userUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelRepository.findByUsername(username)];
                    case 1:
                        model = _a.sent();
                        if (!model)
                            throw { status: ErrorConstants_1.ErrorStatus.not_found, message: ErrorConstants_1.ErrorMessage.id_not_found };
                        userToBeUpdated = Object.assign(model, { likes: model.likes + 1 });
                        return [4 /*yield*/, this.modelRepository.save(userToBeUpdated)];
                    case 2:
                        userUpdated = _a.sent();
                        return [2 /*return*/, userUpdated];
                }
            });
        });
    };
    ModelService.prototype.delete = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var model, images;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelRepository.findByUsername(username)];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, this.imageRepository.findByModelId(username)];
                    case 2:
                        images = _a.sent();
                        images.forEach(function (image) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.imageService.deleteFromS3(image)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [4 /*yield*/, this.modelRepository.delete(model.id)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ModelService;
}());
exports.default = ModelService;
//# sourceMappingURL=ModelService.js.map