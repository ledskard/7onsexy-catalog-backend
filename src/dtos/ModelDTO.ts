import { Image } from "../entities/Image";

export interface ICreateModelDTO {    
    username: string;
    location: string;
    description: string;
    likes: number;
    telegramVip: string;
    telegramFree: string;
    images: Image[];
    profileImg: Image;
    profileImageId?: string;
}