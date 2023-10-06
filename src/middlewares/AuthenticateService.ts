import { UserRepository } from "../repositories/UserRepository";
import * as bcrypt from "bcrypt";
import {deletePassword} from "../utils/functions/DeletePassword";
import {User} from "../entities/User";
import {ErrorMessage, ErrorStatus} from "../utils/constants/ErrorConstants";

export default class AuthenticateService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async authenticate(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findByUsername(username);
        if (!user) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_or_password_incorrect };
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw { status: 400, message: ErrorMessage.password_invalid };
        deletePassword(user);
        return user;
    }
 
}
