import { Request, Response } from "express";
import AuthenticateService from "./AuthenticateService";
import {ProcessError} from "../utils/ProcessError";
import TokenService from "./TokenService";

export default class AuthenticateController {
    public async authenticate(req: Request, res: Response): Promise<Response> {
        try {
            const authenticateService = new AuthenticateService();
            const tokenService = new TokenService();
            // const user = await authenticateService.authenticate(req.body.username, req.body.password);
            // const token = await tokenService.generateToken(user);
            return res.status(200).json({ token: "", user: "" });
        } catch (err) {
            return ProcessError(res, err);
        }
    }
    
}