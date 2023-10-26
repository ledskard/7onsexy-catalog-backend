import { Router } from "express";
import ModelController from "../controllers/ModelController";
import { validateCreateModel } from "../schemas/ModelSchema";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const modelRouter = Router();
const modelController = new ModelController();
const authMiddleware = new AuthMiddleware();

modelRouter.post("/",validateCreateModel, modelController.create);
modelRouter.get("/:id", modelController.findById);
modelRouter.get("/", modelController.findAll);
modelRouter.put("/:id", modelController.update)
modelRouter.post("/:id", modelController.increaseLike);
modelRouter.delete("/:id", modelController.delete);
export default modelRouter;
