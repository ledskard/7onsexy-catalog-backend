import { Router } from "express";
import ModelController from "../controllers/ModelController";
import { validateCreateModel } from "../schemas/ModelSchema";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const modelRouter = Router();
const modelController = new ModelController();
const authMiddleware = new AuthMiddleware();

modelRouter.post("/", validateCreateModel, modelController.create);
modelRouter.get("/:id", modelController.findById);
modelRouter.put("/:id", authMiddleware.auth, modelController.update);
modelRouter.get("/", modelController.findAll);
modelRouter.post("/:id", authMiddleware.auth, modelController.increaseLike);
modelRouter.delete("/:id", authMiddleware.auth, modelController.delete);

export default modelRouter;
