import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {ErrorMessage, ErrorStatus} from "../utils/constants/ErrorConstants";
import TOKEN from "../utils/constants/TokenConstants";

export default class AuthMiddleware { 
    public async auth(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        try {
            // if (!authorization) {
            //   return res.status(401).send({
            //     status: ErrorStatus.unauthorized,
            //     message: ErrorMessage.permission_denied,
            //   });
            // }
            // let url = req.baseUrl + req.path;
            // url = url.replace(/[\d]/g, "");
    
            // const token = authorization.replace("Bearer ", "").trim();
            
            // jwt.verify(token, TOKEN.SECRET_TOKEN);
            return next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).send({
                    status: ErrorStatus.unauthorized,
                    message: ErrorMessage.token_expired,
                });
            }
    
            return res.status(401).send({
                status: ErrorStatus.unauthorized,
                message: ErrorMessage.permission_denied,
            });
        }
    }
    
}
