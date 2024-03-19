import { Repository } from "typeorm";
import { Like } from "../entities/Like";
import { AppDataSource } from "../database/data-source";

export class LikeRepository {
    private readonly likeRepository: Repository<Like>;

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Like);
    }
    public async create(data: Like): Promise<Like> {
        const like = await this.likeRepository.create(data);
        await this.likeRepository.save(like);
        return like;
    }
    public async findById(id: string): Promise<Like | undefined> {
        const like = await this.likeRepository
        .createQueryBuilder("like")
        .where("like.id = :id", { id })
        .getOne();

        return like;
    }
    public async findByModelId(id: string): Promise<Like[] | undefined> {
        const like = await this.likeRepository
        .createQueryBuilder("l")
        .leftJoinAndSelect("l.model", "lm")
        .where("lm.id = :id", { id })
        .getMany();

        return like;
    }

    public async save(data: Like): Promise<Like> {
        return await this.likeRepository.save(data);
    }
    public async deleteById(id: string): Promise<void> {
    
        await this.likeRepository.delete(id);
    }
}
