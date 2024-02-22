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

modelRouter.post("/validate-token", authMiddleware.auth, 
(req, res) => { console.log(req.body) 
    res.status(200).send({status: "200"})})

modelRouter.post("/:id",  modelController.increaseLike);
modelRouter.delete("/:id", authMiddleware.auth, modelController.delete);

export default modelRouter;
