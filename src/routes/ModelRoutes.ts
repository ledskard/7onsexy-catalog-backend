import { Router } from "express";
import ModelController from "../controllers/ModelController";
import { validateCreateModel } from "../schemas/ModelSchema";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const modelRouter = Router();
const modelController = new ModelController();
const authMiddleware = new AuthMiddleware();

modelRouter.post("/", authMiddleware.auth, validateCreateModel, modelController.create);
modelRouter.get("/:id", modelController.findById);
modelRouter.put("/:id", authMiddleware.auth,modelController.update);
modelRouter.get("/", modelController.findAll);
modelRouter.get("/likes/weekly", modelController.findWeeklyMostLiked);
modelRouter.post("/manage-subscription", modelController.manageSubscription)
modelRouter.get("/get-likes-by-model/:id", modelController.getLikesByModel)
modelRouter.post("/:id",  modelController.increaseLike);
modelRouter.delete("/:id", authMiddleware.auth, modelController.delete);
modelRouter.get("/all/all", modelController.findReallyAll);

export default modelRouter;
