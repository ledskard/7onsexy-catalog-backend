import { Response } from "express";

export const ProcessError = (res: Response, err: any) => {

    const code = err.status ? err.status : 500;
    const message = err.message ? err.message : 'Erro desconhecido';
    return res.status(code).send({ code, message });
};
