import { Router } from "express";
import ModelController from "../controllers/ModelController";
import { validateCreateModel } from "../schemas/ModelSchema";

const userRouter = Router();
const modelController = new ModelController();

userRouter.post("/", validateCreateModel, modelController.create);
userRouter.get("/:id", modelController.findById);
userRouter.get("/all", modelController.findAll);
userRouter.post("/:id", modelController.increaseLike)

export default userRouter;
