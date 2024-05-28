import { ICreateModelDTO } from "../dtos/ModelDTO";
import { Likes } from "../entities/Likes";
import { Model } from "../entities/Model";
import { ImageRepository } from "../repositories/ImageRepository";
import { LikeRepository } from "../repositories/LikeRepository";
import { ModelRepository } from "../repositories/ModelRepository";
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";
import ImageService from "./ImageService";

export default class ModelService {
    private readonly modelRepository: ModelRepository;
    private readonly imageRepository: ImageRepository;
    private readonly imageService: ImageService;
    private readonly likeRepository: LikeRepository;
    constructor() {
        this.modelRepository = new ModelRepository();
        this.imageRepository = new ImageRepository();
        this.imageService = new ImageService();
        this.likeRepository = new LikeRepository();

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

    public async findById(userId: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findByUsername(userId);
        if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        const hasFeatureFlags = model.featureFlags && model.featureFlags.length > 0;

          if (model.profileImageId) {
              model.profileImage = await this.imageRepository.findById(model.profileImageId);
          }
          if (model.coverImageId) {
            let coverImage = await this.imageRepository.findById(model.coverImageId);
            if (!hasFeatureFlags && coverImage.url.toLowerCase().includes('gif')) {
                model.coverImage = null;
            } else {
                model.coverImage = coverImage;
            }
          }
          if (!hasFeatureFlags && model.images && model.images.length > 0) {
            model.images = model.images.filter(image => image.url.toLowerCase().includes('gif'));
        }
        return model;
    }
  //   public async getLikesByModel(userId: string): Promise<any> {
  //     const model = await this.modelRepository.getLikesByModel(userId);
      
  //     if (!model) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
  //     return model;
  // }

    public async cancelSubscription(email: string): Promise<Model | undefined> {
        const model = await this.modelRepository.findByUsername(email)
        // const modelToBeUpdated = Object.assign(model, { featureFlags: [
        //      
        //   ]});
        const modelToBeUpdated = Object.assign(model, {
            featureFlags: [

            ]
        });
        const modelUpdated = await this.modelRepository.save(modelToBeUpdated);

        return modelUpdated;
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
      const models = await this.modelRepository.findWeeklyMostLiked();
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

    public async findAll(type?: string, page?: number, filter?: string): Promise<{ data: Model[], totalPages: number }> {
        const { data, totalPages } = await this.modelRepository.findAll(type, page, filter);
        for (const model of data) {
          const hasFeatureFlags = model.featureFlags && model.featureFlags.length > 0;

          if (model.profileImageId) {
              model.profileImage = await this.imageRepository.findById(model.profileImageId);
          }
          if (model.coverImageId) {
            let coverImage = await this.imageRepository.findById(model.coverImageId);
            if (!hasFeatureFlags && coverImage.url.toLowerCase().includes('gif')) {
                model.coverImage = null;
            } else {
                model.coverImage = coverImage;
            }
          }
          // if (!hasFeatureFlags && model.images && model.images.length > 0) {
          //   model.images = model.images.filter(image => !image.url.toLowerCase().includes('gif'));
          // }
      }
  
        return { data, totalPages };
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
        for (const image of images) {
            await this.imageService.deleteFromS3(image);
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
