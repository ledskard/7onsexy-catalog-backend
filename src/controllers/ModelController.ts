import { Request, Response } from "express";
import { ProcessError } from "../utils/ProcessError";
import ModelService from "../services/ModelService";

export default class ModelController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const modelService = new ModelService();
            await modelService.create(req.body);

            return res.status(201).send({ success:true });
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const modelService = new ModelService();
            const model = await modelService.findById(id);
            return res.status(200).json(model);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
