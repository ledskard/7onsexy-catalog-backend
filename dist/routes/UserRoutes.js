"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var UserSchema_1 = require("../schemas/UserSchema");
var AuthenticateController_1 = require("../middlewares/AuthenticateController");
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var userRouter = (0, express_1.Router)();
var userController = new UserController_1.default();
var authenticateController = new AuthenticateController_1.default();
var authMiddleware = new AuthMiddleware_1.default();
userRouter.post("/", UserSchema_1.validateCreateUser, userController.create);
userRouter.post("/login", UserSchema_1.validateAuthenticateUser, authenticateController.authenticate);
exports.default = userRouter;
//# sourceMappingURL=UserRoutes.js.map