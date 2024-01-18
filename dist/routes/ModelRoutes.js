"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ModelController_1 = require("../controllers/ModelController");
var ModelSchema_1 = require("../schemas/ModelSchema");
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var modelRouter = (0, express_1.Router)();
var modelController = new ModelController_1.default();
var authMiddleware = new AuthMiddleware_1.default();
modelRouter.post("/", ModelSchema_1.validateCreateModel, authMiddleware, modelController.create);
modelRouter.get("/:id", modelController.findById);
modelRouter.put("/:id", authMiddleware, modelController.update);
modelRouter.get("/", modelController.findAll);
modelRouter.post("/:id", modelController.increaseLike);
modelRouter.delete("/:id", authMiddleware, modelController.delete);
exports.default = modelRouter;
//# sourceMappingURL=ModelRoutes.js.map