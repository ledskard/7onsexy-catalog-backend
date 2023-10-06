import * as jwt from "jsonwebtoken";
import {User} from "../entities/User";
import TOKEN from "../utils/constants/TokenConstants";
import { IReturnDecodedTokenDTO } from "../dtos/TokenDTO";

export default class TokenService {
    
    public async generateToken(user: User): Promise<string> {
        let token;
            token = jwt.sign({ id: user.id }, TOKEN.SECRET_TOKEN, {
                expiresIn: TOKEN.EXPIRE_TOKEN_TIME,
            });
        return token;
    }

    public async decode(token: string): Promise<IReturnDecodedTokenDTO> {
        const payload = await jwt.decode(token);
        return payload;
    }
}
