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
        
            if (data.profileImg?.base64) {
                try {
                    const profileImageResponse = await this.imageService.saveFile(data.profileImg);
                    data.profileImg.url = profileImageResponse.imageUrl;
                    data.profileImg.name = profileImageResponse.fileName;
                    delete data.profileImg.base64;
                    const savedImage = await this.imageRepository.create(data.profileImg)
                    data.profileImageId = savedImage.id;
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
        const model = await this.modelRepository.findByUsername(userId);
        const profileImage = await this.imageRepository.findById(model.profileImageId)
        model.profileImage = profileImage;
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        return model;
    }
   
    public async update(username: string, data: any): Promise<Model | undefined> {
        const model = await this.modelRepository.findByUsername(username);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
    
        let oldProfileImageId = null;
        let oldProfileImageName = null; 

        let oldImages = [];
        if(data.images)
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
    
        if (data.profileImg?.base64) {
            try {
                if (model.profileImageId) {
                    const profileImage = await this.imageRepository.findById(model.profileImageId);
                    oldProfileImageId = profileImage.id;
                    oldProfileImageName = profileImage.name;
                }
                const profileImageResponse = await this.imageService.saveFile(data.profileImg);
                data.profileImg.url = profileImageResponse.imageUrl;
                data.profileImg.name = profileImageResponse.fileName;
                delete data.profileImg.base64;
                const savedImage = await this.imageRepository.create(data.profileImg)
                data.profileImageId = savedImage.id;
            } catch (error) {
                throw { code: ErrorStatus.internal_server_error, message: ErrorMessage.could_not_send_image }
            }
        }
        }));
        
        const modelToBeUpdated = Object.assign(model, data);
        const modelUpdated = await this.modelRepository.save(modelToBeUpdated);
    
        if (oldProfileImageId && oldProfileImageName) {
            await this.imageService.deleteFromS3({id: oldProfileImageId, name: oldProfileImageName});
        }
        if (oldImages.length > 0){
            for (const image of oldImages) {
                if(image.id && image.name){
                    await this.imageService.deleteFromS3(image.name);
                }
            }        
        }
        
        return modelUpdated;
    }
    
    public async findAll(type?: string): Promise<Model[]> {
        
        const models = await this.modelRepository.findAll(type);
        for (const model of models) {
            const profileImage = await this.imageRepository.findById(model.profileImageId)
            model.profileImage = profileImage
        }
        return models;
    }

    public async increaseLike(username: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findByUsername(username);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        const userToBeUpdated = Object.assign(model, {likes: model.likes + 1});
        let userUpdated = await this.modelRepository.save(userToBeUpdated);
        return userUpdated;
    }

    public async delete(username: string): Promise<any> {
        const model = await this.modelRepository.findByUsername(username)
        const images = await this.imageRepository.findByModelId(username);
        images.forEach(async image => await this.imageService.deleteFromS3(image))
        return await this.modelRepository.delete(model.id)
    }
}
