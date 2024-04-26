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
    public async manageSubscription(req: Request, res: Response): Promise<Response | void> {
        try {
            const modelService = new ModelService();
            await modelService.manageSubscription();

            return res.status(200).send({ success:true });
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
  public async getLikesByModel(req: Request, res: Response): Promise<Response> {
      try {
          const { id } = req.params;
          const modelService = new ModelService();
          const model = await modelService.getLikesByModel(id);
          return res.status(200).json(model);
      } catch (err) {
          return ProcessError(res, err);
      }
  }
    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const modelService = new ModelService();
            const model = await modelService.update(id, req.body);
            return res.status(200).json(model);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
        public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const { type, page, filter } = req.query
            const modelService = new ModelService();
            const filterString = filter ? filter.toString() : null;
            const typeString = type ? type.toString() : null;
            const pageString = page ? Number(page) : null;
            const model = await modelService.findAll(typeString,  pageString, filterString);
            return res.status(200).json(model);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
    public async findWeeklyMostLiked(req: Request, res: Response): Promise<Response> {
      try {
          const modelService = new ModelService();
          const model = await modelService.findWeeklyMostLiked();
          return res.status(200).json(model);
      } catch (err) {
          return ProcessError(res, err);
      }
  }
    

    public async increaseLike(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const modelService = new ModelService();
            const model = await modelService.increaseLike(id);
            return res.status(200).json(model);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const modelService = new ModelService();
            const model = await modelService.delete(id);
            return res.status(200).json(model);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
}
