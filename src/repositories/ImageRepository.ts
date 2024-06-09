import { Repository } from "typeorm";
import { Image } from "../entities/Image";
import { AppDataSource } from "../database/data-source";

export class ImageRepository {
    private readonly imageRepository: Repository<Image>;

    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image);
    }
    public async create(data: Image): Promise<Image> {
        const model = await this.imageRepository.create(data);
        await this.imageRepository.save(model);
        return model;
    }
    public async findById(id: string): Promise<Image | undefined> {
        const image = await this.imageRepository
        .createQueryBuilder("image")
        .where("image.id = :id", { id })
        .getOne();

        return image;
    }
    public async findByModelId(id: string): Promise<Image[] | undefined> {
        const image = await this.imageRepository
        .createQueryBuilder("i")
        .leftJoinAndSelect("i.model", "im")
        .where("im.id = :id", { id })
        .getMany();

        return image;
    }
    public async findFirstByModelIdWithoutGif(id: string): Promise<Image | undefined> {
      const image = await this.imageRepository
          .createQueryBuilder("i")
          .leftJoinAndSelect("i.model", "im")
          .where("im.id = :id", { id })
          .andWhere("LOWER(i.name) NOT LIKE :gif", { gif: '%gif%' })
          .orderBy("i.id", "ASC")
          .getOne();

      return image;
  }
  public async findFirstByModelIdWithGif(id: string): Promise<Image | undefined> {
    // Primeiro, tenta encontrar um GIF
    const gifImage = await this.imageRepository
        .createQueryBuilder("i")
        .leftJoinAndSelect("i.model", "im")
        .where("im.id = :id", { id })
        .andWhere("LOWER(i.name) LIKE :gif", { gif: '%gif%' })
        .orderBy("i.id", "ASC")
        .getOne();

    // Se encontrar um GIF, retorna
    if (gifImage) {
        return gifImage;
    }

    // Caso contrário, busca o primeiro registro
    const firstImage = await this.imageRepository
        .createQueryBuilder("i")
        .leftJoinAndSelect("i.model", "im")
        .where("im.id = :id", { id })
        .orderBy("i.id", "ASC")
        .getOne();

    return firstImage;
  }
    public async save(data: Image): Promise<Image> {
        return await this.imageRepository.save(data);
    }
    public async deleteById(id: string): Promise<void> {
    
        await this.imageRepository.delete(id);
    }
}
