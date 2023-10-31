import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Image } from "./Image";


@Entity("model")
export class Model {

    @PrimaryGeneratedColumn({ name: "id" })
    id: string;

    @Column({ name:"username", unique:true })
    username: string;

    @Column({ name:"instagram", nullable: true })
    instagram: string;

    @Column({ name:"description" })
    description: string;

    @Column({ name:"type" })
    type: string;

    @Column({ name: "likes" })
    likes: number;

    @Column({ name: "telegram_vip" })
    telegramVip: string;
    
    @Column({ name: "telegram_free" })
    telegramFree: string;

    @Column({ name: "tiktok", nullable: true  })
    tiktok: string;

    @Column({ name: "twitter", nullable: true  })
    twitter: string;

    @Column({ name: "profile_image_id", nullable:true })
    profileImageId: string;
    
    @OneToMany(type => Image, image => image.model, { cascade: true }) 
    images: Image[]; 

    profileImage?: Image;
}
