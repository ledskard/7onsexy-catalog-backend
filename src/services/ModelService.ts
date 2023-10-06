import { ICreateModelDTO } from "../dtos/ModelDTO";
import { Model } from "../entities/Model";
import { ModelRepository } from "../repositories/ModelRepository";
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";

export default class ModelService {
    private readonly modelRepository: ModelRepository;

    constructor() {
        this.modelRepository = new ModelRepository();
    }

    public async create(data: ICreateModelDTO): Promise<Model | undefined> {
        const verifyAlreadyExistModel = await this.modelRepository.findByUsername(data.username);
        if (verifyAlreadyExistModel) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_already_registered }
        const model = await this.modelRepository.create(data);
        return model;
    }

    public async findById(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findById(userId);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        return model;
    }
    public async findAll(filter: any): Promise<Model[]> {
        const models = await this.modelRepository.findAll(filter);
        return models;
    }

    public async increaseLike(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findById(userId);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        const userToBeUpdated = Object.assign(model, {likes: model.likes + 1});
        let userUpdated = await this.modelRepository.save(userToBeUpdated);
        return userUpdated;
    }

}
