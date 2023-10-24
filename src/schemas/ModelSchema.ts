import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/SchemaValidator";

export const validateCreateModel = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {

    const imageSchema = Joi.object().keys({
        name: Joi.string().required().messages({
            "any.required": "O campo name em image é obrigatório"
        }),
        base64: Joi.string().required().messages({
            "any.required": "O campo base64 em image é obrigatório"
        })
    });

    const schema = Joi.object().keys({
        username: Joi.string().required().messages({
            "any.required": "o campo username é obrigatório",
        }),
        instagram: Joi.optional(),
        description: Joi.string().required().messages({
            "any.required": "O campo description é obrigatório",
        }),
        type: Joi.string().valid('casais', 'mulheres', 'trans', 'homens').required().messages({
            "any.required": "O campo type é obrigatório",
            "any.only": "O campo type deve ser 'casais', 'mulheres' ou 'trans' ou homens",
        }),
        telegramVip: Joi.string().required().messages({  
            "any.required": "O campo telegramVip é obrigatório",
            "string.uri": "O campo telegramVip deve ser uma URI válida"
        }),
        telegramFree: Joi.string().required().messages({  
            "any.required": "O campo telegramFree é obrigatório",
            "string.uri": "O campo telegramFree deve ser uma URI válida"
        }),
        likes: Joi.optional(),
        profileImg: Joi.optional(),
        images: Joi.array().items(imageSchema).required().messages({
        "any.required": "O campo images é obrigatório"
    })
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};