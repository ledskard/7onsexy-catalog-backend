import { ICreateModelDTO } from "../dtos/ModelDTO";
import { Model } from "../entities/Model";
import { ModelRepository } from "../repositories/ModelRepository";
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";
import ImageService from "./ImageService";

export default class ModelService {
    private readonly modelRepository: ModelRepository;
    private readonly imageService: ImageService;
    constructor() {
        this.modelRepository = new ModelRepository();
        this.imageService = new ImageService();
    }

    public async create(data: ICreateModelDTO): Promise<Model | undefined> {
        const verifyAlreadyExistModel = await this.modelRepository.findByUsername(data.username);
        if (verifyAlreadyExistModel) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_already_registered }
        try {
            await Promise.all(data.images.map(async (image) =>  {
                if (image?.base64) {
                    try {
                        const imageResponse = await this.imageService.saveFile(image);
                        image.url = imageResponse.imageUrl;
                        image.name = imageResponse.fileName;
                        delete image.base64;
                    } catch (error) {
                        throw { code: ErrorStatus.internal_server_error, message: ErrorMessage.could_not_send_image }
                    }
                }
            }));
            
            const model = await this.modelRepository.create(data);
            return model;
        } catch (error) {
            throw error;
        }
    }

    public async findById(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findById(userId);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        return model;
    }
    public async findAll(type?: string): Promise<Model[]> {
        console.log(type)
        const models = await this.modelRepository.findAll(type);
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
