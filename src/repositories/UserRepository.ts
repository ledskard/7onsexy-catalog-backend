import { Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/UserDTO";
import { AppDataSource } from "../database/data-source";

export class UserRepository {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.userRepository
            .createQueryBuilder("u")
            .where("u.id = :id", {id})
            .getOne();
        return user;
    }
    
    public async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userRepository
            .createQueryBuilder("u")
            .where("u.username = :username", {username})
            .getOne();
        return user;
    }

    
    public async save(data: User): Promise<User> {
        return await this.userRepository.save(data);
    }
    
}
