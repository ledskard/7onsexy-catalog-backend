import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../database/data-source";

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

    public async save(data: Likes): Promise<Likes> {
        return await this.likeRepository.save(data);
    }
    public async deleteById(id: string): Promise<void> {
    
        await this.likeRepository.delete(id);
    }
}
