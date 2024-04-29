import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../database/data-source";
import { Button } from "../entities/Button";

export class ButtonRepository {
    private readonly buttonRepository: Repository<Button>;

    constructor() {
        this.buttonRepository = AppDataSource.getRepository(Button);
    }
    public async create(data: Button): Promise<Button> {
        const button = await this.buttonRepository.create(data);
        await this.buttonRepository.save(button);
        return button;
    }
    public async findByModelId(id: string): Promise<Button[] | undefined> {
        const button = await this.buttonRepository
        .createQueryBuilder("l")
        .leftJoinAndSelect("l.model", "lm")
        .where("lm.id = :id", { id })
        .getMany();

        return button;
    }
    public async save(data: Button): Promise<Button> {
        return await this.buttonRepository.save(data);
    }
    public async deleteById(id: string): Promise<void> {
    
        await this.buttonRepository.delete(id);
    }
}
