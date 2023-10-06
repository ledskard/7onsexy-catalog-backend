import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Image } from "./Image";


@Entity("model")
export class Model {

    @PrimaryGeneratedColumn({ name: "id" })
    id: string;

    @Column({ name:"username", unique:true })
    username: string;

    @Column({ name:"location" })
    location: string;

    @Column({ name:"description" })
    description: string;

    @Column({ name:"type" })
    type: string;

    @Column({name: "likes"})
    likes: number;

    @Column({name: "telegram_vip"})
    telegramVip: string;
    
    @Column({name: "telegram_free"})
    telegramFree: string;

    @OneToMany(type => Image, image => image.model, { cascade: true }) 
    images: Image[]; 

}
