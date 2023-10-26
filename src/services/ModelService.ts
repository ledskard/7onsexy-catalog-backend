import { ICreateModelDTO } from "../dtos/ModelDTO";
import { Model } from "../entities/Model";
import { ImageRepository } from "../repositories/ImageRepository";
import { ModelRepository } from "../repositories/ModelRepository";
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";
import ImageService from "./ImageService";

export default class ModelService {
    private readonly modelRepository: ModelRepository;
    private readonly imageRepository: ImageRepository;
    private readonly imageService: ImageService;
    constructor() {
        this.modelRepository = new ModelRepository();
        this.imageRepository = new ImageRepository();
        this.imageService = new ImageService();
    }

    public async create(data: ICreateModelDTO): Promise<Model | undefined> {
        const verifyAlreadyExistModel = await this.modelRepository.findByUsername(data.username);
        if (verifyAlreadyExistModel) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_already_registered }
        const model = await this.modelRepository.create(data);
        return model;
    }

    public async findById(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findById(userId);
        const profileImage = await this.imageRepository.findById(model.profileImageId)
        model.profileImage = profileImage;
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        return model;
    }

    public async update(id:string, data: any): Promise<Model | undefined> {
        const model = await this.modelRepository.findById(id);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };


        const modelToBeUpdated = Object.assign(model, data);
        const modelUpdated = await this.modelRepository.save(modelToBeUpdated);
        return modelUpdated;
    }


    public async findAll(type?: string): Promise<Model[]> {
        const models = await this.modelRepository.findAll(type);
        // for (const model of models) {
        //     const profileImage = await this.imageRepository.findById(model.profileImageId)
        //     model.profileImage = profileImage
        // }
        return models;
    }

    public async increaseLike(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findById(userId);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        const userToBeUpdated = Object.assign(model, {likes: model.likes + 1});
        let userUpdated = await this.modelRepository.save(userToBeUpdated);
        return userUpdated;
    }

    public async delete(id:string): Promise<any> {
        const images = await this.imageRepository.findByModelId(id);
        images.forEach(async image => await this.imageService.deleteFromS3(image))
        return await this.modelRepository.delete(id)
    }
}
