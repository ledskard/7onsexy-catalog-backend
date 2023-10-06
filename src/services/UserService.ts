import { ICreateUserDTO } from "../dtos/UserDTO";
import { User } from "../entities/User";
import TokenService from "../middlewares/TokenService";
import { ImageRepository } from "../repositories/ImageRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ErrorMessage, ErrorStatus } from "../utils/constants/ErrorConstants";
import { deletePassword } from "../utils/functions/DeletePassword";
import ImageService from "./ImageService";

export default class UserService {
    private readonly userRepository: UserRepository;
    private readonly imageRepository: ImageRepository;
    private readonly imageService: ImageService;
    private readonly tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.imageService = new ImageService();
        this.imageRepository = new ImageRepository();
        this.tokenService = new TokenService();
    }

    public async create(data: ICreateUserDTO): Promise<User | undefined> {
        const verifyAlreadyExistUser = await this.userRepository.findByEmail(data.email) || await this.userRepository.findByUsername(data.username);
        if (verifyAlreadyExistUser) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_already_registered }
        const user = await this.userRepository.create(data);
        return user;
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findByUsername(username);
        if (!user) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        deletePassword(user);
        return user;
    }
    public async update(authorization: string, data: ICreateUserDTO): Promise<User | undefined> {
        const userId = await this.decodeToken(authorization)
        const user = await this.userRepository.findById(userId);
        if (!user) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        
        const userToBeUpdated = Object.assign(user, data);
        let userUpdated = await this.userRepository.save(userToBeUpdated);
        
        deletePassword(userUpdated);
        return userUpdated;
    }

    private async decodeToken(authorization: string): Promise<string>{
        const token = authorization.replace("Bearer ", "").trim();
        const decodedToken = await this.tokenService.decode(token);
        return decodedToken.id
    }

}
