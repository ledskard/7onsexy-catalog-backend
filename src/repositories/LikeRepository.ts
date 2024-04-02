import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../database/data-source";
import { endOfWeek, startOfWeek } from "date-fns";

export class LikeRepository {
    private readonly likeRepository: Repository<Likes>;

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Likes);
    }
    public async create(data: Likes): Promise<Likes> {
        const like = await this.likeRepository.create(data);
        await this.likeRepository.save(like);
        return like;
    }
    public async findById(id: string): Promise<Likes | undefined> {
        const like = await this.likeRepository
        .createQueryBuilder("like")
        .where("like.id = :id", { id })
        .getOne();

        return like;
    }
    public async findByModelId(id: string): Promise<Likes[] | undefined> {
        const like = await this.likeRepository
        .createQueryBuilder("l")
        .leftJoinAndSelect("l.model", "lm")
        .where("lm.id = :id", { id })
        .getMany();

        return like;
    }
    public async findWeeklyMostLiked(): Promise<string[]> {
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
  
      const topModels = await this.likeRepository
          .createQueryBuilder("like")
          .select("like.modelId", "modelId") // Seleciona apenas o modelId
          .addSelect("COUNT(like.id)", "likeCount") // Conta o número de likes
          .where("like.date BETWEEN :startOfTheWeek AND :endOfTheWeek", { startOfTheWeek, endOfTheWeek }) // Filtra likes na semana atual
          .groupBy("like.modelId") // Agrupa por modelId
          .orderBy("likeCount", "DESC") // Ordena pela contagem de likes em ordem decrescente
          .take(50) // Limita a 8 modelos
          .getRawMany(); // Executa a consulta e retorna os resultados brutos
  
      // Mapeia os resultados para extrair apenas os IDs dos modelos
      const modelIds = topModels.map(result => result.modelId);
  
      return modelIds;
  }
    public async save(data: Likes): Promise<Likes> {
        return await this.likeRepository.save(data);
    }
    public async deleteById(id: string): Promise<void> {
    
        await this.likeRepository.delete(id);
    }
}
