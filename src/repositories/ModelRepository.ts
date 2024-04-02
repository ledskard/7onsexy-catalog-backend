import { Repository } from "typeorm";
import { Model } from "../entities/Model";
import { AppDataSource } from "../database/data-source";
import { ICreateModelDTO } from "../dtos/ModelDTO";
import { startOfWeek, endOfWeek } from 'date-fns';
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";

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
    
    public async findAll(type?: string, page = 1, filter?: string): Promise<{ data: Model[], totalPages: number }> {
      const MODELS_PER_PAGE = 18;
      const skip = Math.max(0, (page - 1) * MODELS_PER_PAGE);
  
      const queryBuilder = this.modelRepository
          .createQueryBuilder("m")
          .leftJoinAndSelect("m.featureFlags", "mf")
          .leftJoinAndSelect("m.images", "imagens")
          .leftJoin("m.trackingLikes", "like")
          .groupBy("m.id, imagens.id, mf.id")
          .orderBy('m.likes', 'DESC')
          .take(MODELS_PER_PAGE)
          .skip(skip);
  
      if (type) {
          queryBuilder.andWhere("m.type = :type", { type });
      }
      
      if(filter) {
        queryBuilder.andWhere("m.username LIKE :filter", { filter: `%${filter}%` })        }
  
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

      const totalPages = Math.ceil(totalCount / MODELS_PER_PAGE);
  
      return { data, totalPages };
  }
  
  

  public async findWeeklyMostLiked(modelIds: string[]): Promise<Model[]> {
    if(modelIds) {
      const models = await AppDataSource.getRepository(Model)
      .createQueryBuilder("model")
      .leftJoinAndSelect("model.images", "mi")
      .leftJoin("model.featureFlags", "featureFlag") // Junção com a tabela de FeatureFlags
      .where("model.id IN (:...modelIds)", { modelIds })
      .andWhere("featureFlag.id IS NOT NULL") // Certifica-se de que há pelo menos um FeatureFlag associado
      .getMany();
      console.log("modelos opr semana", models)
    return models;
    }
    
  }
    // public async getLikesByModel(username: string):Promise<any> {
    //   const cleanedUsername = username.includes(' ') ? username.replace(/\s/g, '') : username;

    //   return this.modelRepository
    //     .createQueryBuilder('model')
    //     .leftJoin('model.trackingLikes', 'like')
    //     .addSelect('COUNT(like.id)', 'likeCount')
    //     .where("REPLACE(model.username, ' ', '') = :username", { username: cleanedUsername })
    //     .groupBy('model.id, mi.id, mi.url, mi.name') 
    //     .orderBy('likeCount', 'DESC')
    //     .limit(6)
    //     .getCount();
    // }

    public async findByUsername(username: string): Promise<Model | undefined> {
      const cleanedUsername = username.includes(' ') ? username.replace(/\s/g, '') : username;

        let query = this.modelRepository
        .createQueryBuilder("m")
        .leftJoinAndSelect("m.images", "mi")
        .leftJoinAndSelect("m.featureFlags", "mf")
        .where("REPLACE(m.username, ' ', '') = :username", { username: cleanedUsername });

      const model = await query.getOne();

        if (model && model.featureFlags && model.featureFlags.length > 0) {
          const buttons = await this.modelRepository
              .createQueryBuilder("m")
              .leftJoinAndSelect("m.buttons", "mb")
              .where("m.id = :id", { id: model.id })
              .getOne();

          if (buttons) {
              model.buttons = buttons.buttons;
          }
      }

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
