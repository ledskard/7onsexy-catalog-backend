import { Router } from "express";
import ModelController from "../controllers/ModelController";
import { validateCreateModel } from "../schemas/ModelSchema";

const modelRouter = Router();
const modelController = new ModelController();

modelRouter.post("/", validateCreateModel, modelController.create);
modelRouter.get("/:id", modelController.findById);
modelRouter.get("/", modelController.findAll);
modelRouter.post("/:id", modelController.increaseLike)

export default modelRouter;
