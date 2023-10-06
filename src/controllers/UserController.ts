import { Request, Response } from "express";
import { ProcessError } from "../utils/ProcessError";
import UserService from "../services/UserService";

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const userService = new UserService();
            await userService.create(req.body);

            return res.status(201).send({ success:true });
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findByUsername(req: Request, res: Response): Promise<Response> {
        try {
            const { username } = req.params;
            const userService = new UserService();
            const user = await userService.findByUsername(username);
            console.log(user)
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { authorization } = req.headers;
            const userService = new UserService();
            const user = await userService.update(authorization, req.body);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
