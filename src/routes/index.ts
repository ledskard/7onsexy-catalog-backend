import { Router } from "express";
import Auth from "../middlewares/AuthMiddleware";
import userRouter from "./UserRoutes";

const routes = Router();
const authMiddleware = new Auth();

routes.use("/users", userRouter);

routes.get("/", (req, res)=> {
    res.status(200).send({status: "ok"})
})

export default routes;
