import { ICreateModelDTO } from "../dtos/ModelDTO";
import { Image } from "../entities/Image";
import { Likes } from "../entities/Likes";
import { Model } from "../entities/Model";
import { ButtonRepository } from "../repositories/ButtonRepository";
import { ImageRepository } from "../repositories/ImageRepository";
import { LikeRepository } from "../repositories/LikeRepository";
import { ModelRepository } from "../repositories/ModelRepository";
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";
import ImageService from "./ImageService";
import axios from 'axios';
export default class ModelService {
    private readonly modelRepository: ModelRepository;
    private readonly imageRepository: ImageRepository;
    private readonly imageService: ImageService;
    private readonly likeRepository: LikeRepository;
    private readonly buttonRepository: ButtonRepository;
    constructor() {
        this.modelRepository = new ModelRepository();
        this.imageRepository = new ImageRepository();
        this.imageService = new ImageService();
        this.likeRepository = new LikeRepository();
        this.buttonRepository = new ButtonRepository();
    }

    public async create(data: ICreateModelDTO): Promise<Model | undefined> {
        const verifyAlreadyExistModel = await this.modelRepository.findByUsername(data.username);
        if (verifyAlreadyExistModel) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_already_registered }
        try {
            await Promise.all(data.images.map(async (image) => {
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
                if (data.coverImg?.base64) {
                    try {
                        const coverImgResponse = await this.imageService.saveFile(data.coverImg);
                        data.coverImg.url = coverImgResponse.imageUrl;
                        data.coverImg.name = coverImgResponse.fileName;
                        delete data.coverImg.base64;
                        const savedImage = await this.imageRepository.create(data.coverImg)
                        data.coverImageId = savedImage.id;
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

    public async getLikesByModel(userId: string): Promise<any> {
        const model = await this.modelRepository.getLikesByModel(userId);

        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        return model;
    }

    public async cancelSubscription(email: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findByEmail(email)
        const modelToBeUpdated = Object.assign(model, {
            featureFlags: [

            ]
        });
        const modelUpdated = await this.modelRepository.save(modelToBeUpdated);

        return modelUpdated;
    }


    public async manageSubscription(): Promise<void> {
        try {
            const apiUrl = 'https://api.iugu.com/v1/subscriptions';
            const apiToken = process.env.IUGU_API_TOKEN;
            const statusFilter = 'active';

            const response = await axios.get(`${apiUrl}?api_token=${apiToken}&status_filter=${statusFilter}`);
            const activeSubscriptions = response.data.items;

            const activeEmails = activeSubscriptions.map(sub => sub.customer_email);

            const allModels = await this.modelRepository.findAll();

            for (const model of allModels.data) {
                if (model && model.email) {
                    if (activeEmails.includes(model.email)) {
                        await this.createSubscription(model.email);
                    } else {
                        await this.cancelSubscription(model.email);
                    }
                }

            }
        } catch (error) {
            console.error('Error managing subscriptions:', error);
            throw new Error('Failed to manage subscriptions');
        }
    }

    public async createSubscription(email: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findByEmail(email)
        const modelToBeUpdated = Object.assign(model, {
            featureFlags: [
                {
                    id: 1,
                    name: "enable_social_media",
                    description: "Habilitar redes sociais"
                },
                {
                    id: 2,
                    name: "enable_star",
                    description: "Estrela de modelo PRO"
                },
                {
                    id: 3,
                    name: "enable_create_button",
                    description: "Habilitar botões"
                }
            ]
        });

        const modelUpdated = await this.modelRepository.save(modelToBeUpdated);

        return modelUpdated;
    }

    public async update(username: string, data: any): Promise<Model | undefined> {
        const model = await this.modelRepository.findByUsername(username);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };

        let oldProfileImageId = null;
        let oldProfileImageName = null;
        let updateData = data;

        let oldImages = [];
        if (data.images) {
            await Promise.all(data.images.map(async (image) => {
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
        }
        if (data.profileImg) {
            const { newImageId, oldImageId, oldImageName } = await this.processImage(data.profileImg, model.profileImageId, model);
            if (newImageId) {
                updateData['profileImageId'] = newImageId;
            }
            // Excluindo a imagem antiga do S3
            if (oldImageId && oldImageName) {
                await this.imageService.deleteFromS3({ id: oldImageId, name: oldImageName });
            }
        }

        // Processando a coverImg
        if (data.coverImg) {
            const { newImageId, oldImageId, oldImageName } = await this.processImage(data.coverImg, model.coverImageId, model);
            if (newImageId) {
                updateData['coverImageId'] = newImageId;
            }
            // Excluindo a imagem antiga do S3
            if (oldImageId && oldImageName) {
                await this.imageService.deleteFromS3({ id: oldImageId, name: oldImageName });
            }
        }

        const modelToBeUpdated = Object.assign(model, data);
        const modelUpdated = await this.modelRepository.save(modelToBeUpdated);

        if (oldProfileImageId && oldProfileImageName) {
            await this.imageService.deleteFromS3({ id: oldProfileImageId, name: oldProfileImageName });
        }
        if (oldImages.length > 0) {
            for (const image of oldImages) {
                if (image.id && image.name) {
                    await this.imageService.deleteFromS3(image.name);
                }
            }
        }

        return modelUpdated;
    }


    public async findWeeklyMostLiked(): Promise<Model[]> {
        const modelIds = await this.likeRepository.findWeeklyMostLiked();
        const models = await this.modelRepository.findWeeklyMostLiked(modelIds);
        for (const model of models) {
            if (model.profileImageId) {
                model.profileImage = await this.imageRepository.findById(model.profileImageId);
            }
            if (model.coverImageId) {
                model.coverImage = await this.imageRepository.findById(model.coverImageId);
            }
        }

        return models;
    }

    public async findById(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findByUsername(userId);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };

        model.profileImage = await this.imageRepository.findById(model.profileImageId);
        model.coverImage = await this.imageRepository.findById(model.coverImageId);

        // Filtrando as imagens para remover os GIFs
        model.images = this.filterOutGifs(model.images);

        // Verificando e movendo a coverImage se for GIF
        this.moveCoverImageToFirstIfGif(model);

        return model;
    }

    public async findAll(type?: string, page?: number, filter?: string): Promise<{ data: Model[], totalPages: number }> {
        const { data, totalPages } = await this.modelRepository.findAll(type, page, filter);

        for (const model of data) {
            if (model.profileImageId) {
                model.profileImage = await this.imageRepository.findById(model.profileImageId);
            }
            if (model.coverImageId) {
                model.coverImage = await this.imageRepository.findById(model.coverImageId);
            }
            // Filtrando as imagens para remover os GIFs
            model.images = this.filterOutGifs(model.images);

            // Verificando e movendo a coverImage se for GIF
            this.moveCoverImageToFirstIfGif(model);
        }

        return { data, totalPages };
    }

    public async findReallyAll(type?: string, page?: number, filter?: string): Promise<{ data: Model[], totalPages: number }> {
        const { data, totalPages } = await this.modelRepository.findAll();

        for (const model of data) {
            if (model.profileImageId) {
                model.profileImage = await this.imageRepository.findById(model.profileImageId);
            }
            if (model.coverImageId) {
                model.coverImage = await this.imageRepository.findById(model.coverImageId);
            }
            // Filtrando as imagens para remover os GIFs
            model.images = this.filterOutGifs(model.images);

            // Verificando e movendo a coverImage se for GIF
            this.moveCoverImageToFirstIfGif(model);
        }

        return { data, totalPages };
    }



    private filterOutGifs(images: Image[]): Image[] {
        return images.filter(image => !image.url.toLowerCase().includes('.gif'));
    }

    private async moveCoverImageToFirstIfGif(model: Model): Promise<void> {
        if (model.coverImage && model.coverImage.url.toLowerCase().includes('.gif')) {
            model.coverImage = model.images[0];
            // if (model.username.toLowerCase() === 'helena filmes') {
            // model.coverImage = await this.imageRepository.findById(model.coverImageId);

            // }
        }
    }

    public async increaseLike(username: string): Promise<Model | undefined> {

        // Encontra a modelo pelo ID
        const model = await this.modelRepository.findByUsername(username);
        if (!model) {
            throw new Error('Modelo não encontrado');
        }

        // Cria um novo like e associa à modelo encontrada
        const like = new Likes();
        like.model = model;
        like.date = new Date();
        const modelToBeUpdated = Object.assign(model, { likes: model.likes + 1 });

        let modelUpdated = await this.modelRepository.save(modelToBeUpdated);
        await this.likeRepository.save(like);

        return modelUpdated;
    }
    public async delete(username: string): Promise<any> {
        const model = await this.modelRepository.findByUsername(username)
        const images = await this.imageRepository.findByModelId(model.id);
        const likes = await this.likeRepository.findByModelId(model.id);
        const buttons = await this.buttonRepository.findByModelId(model.id);
        for (const like of likes) {

            await this.likeRepository.deleteById(like.id);
        }
        for (const image of images) {
            await this.imageService.deleteFromS3(image);
        }
        for (const button of buttons) {
            await this.buttonRepository.deleteById(button.id)
        }

        return await this.modelRepository.delete(model.id)
    }
    private async processImage(imageData: any, oldImageId: string | null, model: Model): Promise<{ newImageId: string, oldImageId: string | null, oldImageName: string | null }> {
        let oldImageName = null;

        if (oldImageId) {
            const oldImage = await this.imageRepository.findById(oldImageId);
            oldImageId = oldImage.id;
            oldImageName = oldImage.name;
        }

        if (imageData?.base64) {
            try {
                const imageResponse = await this.imageService.saveFile(imageData);
                imageData.url = imageResponse.imageUrl;
                imageData.name = imageResponse.fileName;
                delete imageData.base64;
                const savedImage = await this.imageRepository.create(imageData);
                return { newImageId: savedImage.id, oldImageId, oldImageName };
            } catch (error) {
                throw { code: ErrorStatus.internal_server_error, message: ErrorMessage.could_not_send_image }
            }
        }
        return { newImageId: null, oldImageId: null, oldImageName: null };
    }

}
