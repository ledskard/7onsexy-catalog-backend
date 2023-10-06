import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/SchemaValidator";

export const validateCreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        username: Joi.string().required().messages({
            "any.required": "o campo username é obrigatório",
        }),
        password: Joi.string().required().messages({
            "any.required": "O campo password é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
export const validateAuthenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .required()
            .messages({
                "any.required": "O campo username é obrigatório",
            }),
        password: Joi.string().required().messages({
            "any.required": "O campo password é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};

export const validateRecoveryPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .required()
            .messages({
                "any.required": "O campo username é obrigatório",
            })
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
