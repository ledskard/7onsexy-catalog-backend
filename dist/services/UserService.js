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
var TokenService_1 = require("../middlewares/TokenService");
var ImageRepository_1 = require("../repositories/ImageRepository");
var UserRepository_1 = require("../repositories/UserRepository");
var ErrorConstants_1 = require("../utils/constants/ErrorConstants");
var DeletePassword_1 = require("../utils/functions/DeletePassword");
var ImageService_1 = require("./ImageService");
var UserService = /** @class */ (function () {
    function UserService() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.imageService = new ImageService_1.default();
        this.imageRepository = new ImageRepository_1.ImageRepository();
        this.tokenService = new TokenService_1.default();
    }
    UserService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyAlreadyExistUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findByUsername(data.username)];
                    case 1:
                        verifyAlreadyExistUser = _a.sent();
                        if (verifyAlreadyExistUser)
                            throw { status: ErrorConstants_1.ErrorStatus.bad_request, message: ErrorConstants_1.ErrorMessage.user_already_registered };
                        return [4 /*yield*/, this.userRepository.create(data)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.findByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findByUsername(username)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw { status: ErrorConstants_1.ErrorStatus.not_found, message: ErrorConstants_1.ErrorMessage.id_not_found };
                        (0, DeletePassword_1.deletePassword)(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.update = function (authorization, data) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, userToBeUpdated, userUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.decodeToken(authorization)];
                    case 1:
                        userId = _a.sent();
                        return [4 /*yield*/, this.userRepository.findById(userId)];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            throw { status: ErrorConstants_1.ErrorStatus.not_found, message: ErrorConstants_1.ErrorMessage.id_not_found };
                        userToBeUpdated = Object.assign(user, data);
                        return [4 /*yield*/, this.userRepository.save(userToBeUpdated)];
                    case 3:
                        userUpdated = _a.sent();
                        (0, DeletePassword_1.deletePassword)(userUpdated);
                        return [2 /*return*/, userUpdated];
                }
            });
        });
    };
    UserService.prototype.decodeToken = function (authorization) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decodedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = authorization.replace("Bearer ", "").trim();
                        return [4 /*yield*/, this.tokenService.decode(token)];
                    case 1:
                        decodedToken = _a.sent();
                        return [2 /*return*/, decodedToken.id];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=UserService.js.map