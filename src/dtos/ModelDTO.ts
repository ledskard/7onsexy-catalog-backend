import { Image } from "../entities/Image";

export interface ICreateModelDTO {
    username: string;
    description: string;
    likes: number;
    telegramVip: string;
    instagram: string;
    telegramFree: string;
    images: Image[];
    profileImg: Image;
    coverImg: Image;
    email: string;
    profileImageId?: string;
    coverImageId?: string;
}