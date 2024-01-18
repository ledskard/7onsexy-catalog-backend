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
require("dotenv").config();
var client_s3_1 = require("@aws-sdk/client-s3");
var ImageRepository_1 = require("../repositories/ImageRepository");
var ImageService = /** @class */ (function () {
    function ImageService() {
        this.imageRepository = new ImageRepository_1.ImageRepository();
        var s3Config = {
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
        };
        if (process.env.APP_ENV === "local") {
            s3Config.endpoint = "http://localstack_xbio:4566";
            s3Config.forcePathStyle = true;
        }
        this.client = new client_s3_1.S3Client(s3Config);
    }
    ImageService.prototype.saveFile = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var match, mimeType, base64Data, decodedImage, maxSize, timestamp, filenameWithVersion, params, imageUrl, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        match = image.base64.match(/data:(image\/[a-z]+);base64,/);
                        if (!match) {
                            throw new Error("Imagem base64 inválida");
                        }
                        mimeType = match[1];
                        base64Data = image.base64.replace(match[0], "");
                        decodedImage = Buffer.from(base64Data, "base64");
                        maxSize = 30 * 1024 * 1024;
                        if (decodedImage.length > maxSize) {
                            throw new Error("Imagem é muito grande. Tamanho máximo permitido é 30MB.");
                        }
                        timestamp = new Date().getTime();
                        filenameWithVersion = "".concat(timestamp, "_").concat(image.name);
                        params = {
                            Bucket: process.env.S3_BUCKET,
                            Key: filenameWithVersion,
                            Body: decodedImage,
                            ContentType: mimeType,
                        };
                        return [4 /*yield*/, this.client.send(new client_s3_1.PutObjectCommand(params))];
                    case 1:
                        _a.sent();
                        imageUrl = "https://".concat(params.Bucket, ".s3.").concat(process.env.AWS_REGION, ".amazonaws.com/").concat(params.Key);
                        if (process.env.APP_ENV === "local") {
                            imageUrl = "http://localhost:4566/".concat(params.Bucket, "/").concat(params.Key);
                        }
                        return [2 /*return*/, {
                                fileName: filenameWithVersion,
                                imageUrl: imageUrl,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Erro ao enviar arquivo: ", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageService.prototype.deleteFromS3 = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var params, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.imageRepository.deleteById(image.id)];
                    case 1:
                        _a.sent();
                        params = {
                            Bucket: "xbio",
                            Key: image.name,
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.client.send(new client_s3_1.DeleteObjectCommand(params))];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ImageService;
}());
exports.default = ImageService;
//# sourceMappingURL=ImageService.js.map