"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ModelController_1 = require("../controllers/ModelController");
var ModelSchema_1 = require("../schemas/ModelSchema");
var modelRouter = (0, express_1.Router)();
var modelController = new ModelController_1.default();
modelRouter.post("/", ModelSchema_1.validateCreateModel, modelController.create);
modelRouter.get("/:id", modelController.findById);
modelRouter.get("/", modelController.findAll);
modelRouter.post("/:id", modelController.increaseLike);
exports.default = modelRouter;
//# sourceMappingURL=ModelRoutes.js.map