import { Repository } from "typeorm";
import { Model } from "../entities/Model";
import { AppDataSource } from "../database/data-source";
import { ICreateModelDTO } from "../dtos/ModelDTO";

export class ModelRepository {
    private readonly modelRepository: Repository<Model>;

    constructor() {
        this.modelRepository = AppDataSource.getRepository(Model);
    }

    public async create(data: ICreateModelDTO): Promise<Model> {
        const model = await this.modelRepository.create(data);
        await this.modelRepository.save(model);
        return model;
    }

    public async findById(id: string): Promise<Model | undefined> {
        const model = await this.modelRepository
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.images", "mi")
            .leftJoinAndSelect("m.buttons", "mb")
            .leftJoinAndSelect("m.featureFlags", "mf")
            .where("m.username = :id", { id })
            .getOne();
        return model;
    }
    public async findAll(type: string): Promise<Model[]> {
        const model = await this.modelRepository
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.images", "mi")
            .leftJoinAndSelect("m.buttons", "mb")
            .leftJoinAndSelect("m.featureFlags", "mf")
        if (type) {
            model.andWhere("m.type = :type", { type })
        }
        return model.getMany();
    }

    public async findByUsername(username: string): Promise<Model | undefined> {
        console.log(username)
        const cleanedUsername = username.includes(' ') ? username.replace(/\s/g, '') : username;

        const model = await this.modelRepository
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.images", "mi")
            .where("REPLACE(m.username, ' ', '') = :username", { cleanedUsername })
            .getOne();
        return model;
    }

    public async save(data: Model): Promise<Model> {
        return await this.modelRepository.save(data);
    }
    public async delete(id: string): Promise<any> {
        return await this.modelRepository.delete(id)
    }

}
