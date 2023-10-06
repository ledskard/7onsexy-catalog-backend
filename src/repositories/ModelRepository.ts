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
            .where("m.id = :id", {id})
            .getOne();
        return model;
    }
    public async findAll(filters: any): Promise<Model[]> {
        const model = await this.modelRepository
            .createQueryBuilder("m")
        if(filters.type) {
            const typeFilter = filters.type
            model.andWhere("m.type = :typeFilter", {typeFilter})
        }
            
        return model.getMany();;
    }
    public async findByUsername(username: string): Promise<Model | undefined> {
        const model = await this.modelRepository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.image", "image")
            .where("u.username = :username", {username})
            .getOne();
        return model;
    }
    
    public async save(data: Model): Promise<Model> {
        return await this.modelRepository.save(data);
    }
    
}
