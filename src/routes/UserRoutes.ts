import { Router } from "express";
import UserController from "../controllers/UserController";
import {validateAuthenticateUser, validateCreateUser, validateRecoveryPassword} from "../schemas/UserSchema";
import AuthenticateController from "../middlewares/AuthenticateController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const userRouter = Router();
const userController = new UserController();
const authenticateController = new AuthenticateController();
const authMiddleware = new AuthMiddleware();

userRouter.post("/", validateCreateUser, userController.create);
userRouter.post("/login", validateAuthenticateUser, authenticateController.authenticate);

export default userRouter;
