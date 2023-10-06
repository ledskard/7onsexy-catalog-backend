import { Repository } from "typeorm";
import { Image } from "../entities/Image";
import { AppDataSource } from "../database/data-source";

export class ImageRepository {
    private readonly imageRepository: Repository<Image>;

    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image);
    }

    public async findById(id: string): Promise<Image | undefined> {
        const image = await this.imageRepository
        .createQueryBuilder("image")
        .where("image.id = :id", { id })
        .getOne();

        return image;
    }

    public async save(data: Image): Promise<Image> {
        return await this.imageRepository.save(data);
    }
    public async deleteById(id: string): Promise<void> {
    
        await this.imageRepository.delete(id);
    }
}
