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
    
    public async findAll(type?: string, page = 1): Promise<{ data: Model[], totalPages: number }> {
      const MODELS_PER_PAGE = 30;
      const skip = Math.max(0, (page - 1) * MODELS_PER_PAGE);
  
      const queryBuilder = this.modelRepository
          .createQueryBuilder("m")
          .leftJoinAndSelect("m.featureFlags", "mf")
          .leftJoinAndSelect("m.images", "imagens")
          .leftJoin("m.trackingLikes", "like")
          // .groupBy("m.id")
          .orderBy('m.likes', 'DESC')
          .take(MODELS_PER_PAGE)
          .skip(skip);
  
      if (type) {
          queryBuilder.andWhere("m.type = :type", { type });
      }
  
      // Consulta simplificada para contagem total, assumindo índices otimizados e modelagem de dados
      const countQueryBuilder = this.modelRepository
          .createQueryBuilder("m")
          .where(type ? "m.type = :type" : "1=1", { type })
          .getCount();
      // Execução em paralelo das consultas
      const [data, totalCount] = await Promise.all([
          queryBuilder.getMany(),
          countQueryBuilder
      ]);
      console.log(totalCount)

      const totalPages = Math.ceil(totalCount / MODELS_PER_PAGE);
  
      return { data, totalPages };
  }
  
  

  public async findWeeklyMostLiked(): Promise<Model[]> {
    // Criar uma data que representa agora em UTC
    const now = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    ));
    
    // Calcular o início e o fim da semana em UTC
    const startOfTheWeek = startOfWeek(now, { weekStartsOn: 1 }); // Configurado para começar na segunda-feira
    const endOfTheWeek = endOfWeek(now, { weekStartsOn: 1 });
    console.log(startOfTheWeek, endOfTheWeek)
    const models = await this.modelRepository
    .createQueryBuilder('model')
    .leftJoinAndSelect('model.images', 'mi')
    .leftJoin('model.trackingLikes', 'like')
    .addSelect('COUNT(like.id)', 'likeCount')
    .where('like.date BETWEEN :start AND :end', { start: startOfTheWeek, end: endOfTheWeek })
    .groupBy('model.id')
    .orderBy('likeCount', 'DESC')
    .limit(8)
    .getMany();
      console.log(models)
    return models;
  }
    public async getLikesByModel(username: string):Promise<any> {
      const cleanedUsername = username.includes(' ') ? username.replace(/\s/g, '') : username;

      return this.modelRepository
        .createQueryBuilder('model')
        .leftJoin('model.trackingLikes', 'like')
        .addSelect('COUNT(like.id)', 'likeCount')
        .where("REPLACE(model.username, ' ', '') = :username", { username: cleanedUsername })
        .groupBy('model.id, mi.id, mi.url, mi.name') 
        .orderBy('likeCount', 'DESC')
        .limit(6)
        .getCount();
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
