import { Router } from "express";
import Auth from "../middlewares/AuthMiddleware";
import userRouter from "./UserRoutes";
import modelRouter from "./ModelRoutes";

const routes = Router();
const authMiddleware = new Auth();

routes.use("/users", userRouter);
routes.use("/models", modelRouter)
routes.get("/", (req, res)=> {
    console.log('sim')
    res.status(200).send({status: "ok"})
})

export default routes;
