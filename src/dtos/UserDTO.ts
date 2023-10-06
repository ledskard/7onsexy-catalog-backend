import { Image } from "../entities/Image";

export interface ICreateUserDTO {
    username: string;
    email: string;
    password: string;
    image?: Image;
}
export interface IUpdateUserDTO {
    username?: string;
    email?: string;
    password?: string;
    image?: Image;
    templateWallpaper: string;
}
