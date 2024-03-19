import { Repository } from "typeorm";
import { Model } from "../entities/Model";
import { AppDataSource } from "../database/data-source";
import { ICreateModelDTO } from "../dtos/ModelDTO";
import { startOfWeek, endOfWeek } from 'date-fns';

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
    public async findWeeklyMostLiked():Promise<Model[]> {
      const startOfTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Configurado para começar na segunda-feira
    const endOfTheWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

      return this.modelRepository
        .createQueryBuilder('model')
        .leftJoin('model.trackingLikes', 'like')
        .addSelect('COUNT(like.id)', 'likeCount')
        .where('like.date BETWEEN :start AND :end', { start: startOfTheWeek, end: endOfTheWeek })
        .groupBy('model.id')
        .orderBy('likeCount', 'DESC')
        .limit(6)
        .getMany();
    }

    public async findByUsername(username: string): Promise<Model | undefined> {
        const cleanedUsername = username.includes(' ') ? username.replace(/\s/g, '') : username;

        const model = await this.modelRepository
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.images", "mi")
            .leftJoinAndSelect("m.buttons", "mb")
            .leftJoinAndSelect("m.featureFlags", "mf")
            .where("REPLACE(m.username, ' ', '') = :username", { username: cleanedUsername })
            .getOne();
        return model;
    }

    public async findByEmail(email: string): Promise<Model | undefined> {
        const model = await this.modelRepository
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.images", "mi")
            .leftJoinAndSelect("m.buttons", "mb")
            .leftJoinAndSelect("m.featureFlags", "mf")
            .where("m.email = :email", { email: email })
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
