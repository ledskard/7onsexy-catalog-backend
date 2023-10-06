import { Image } from "../../entities/Image";
import { ImageRepository } from "../../repositories/ImageRepository";
import ImageService from "../../services/ImageService";

export default class ImageUtils {

    private readonly imageService: ImageService;
    private readonly imageRepository: ImageRepository;
    constructor() {
        this.imageService = new ImageService()
        this.imageRepository = new ImageRepository()
    }

    public async uploadImage(data: Image){
        const imageResponse = await this.imageService.saveFile(data);
        data.url = imageResponse.imageUrl
        data.name = imageResponse.fileName
        return data;
    }
}
