import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";


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

    @Column({name: "likes"})
    likes: number;

    @Column({name: "telegram_vip"})
    telegramVip: string;
    
    @Column({name: "telegram_free"})
    telegramFree: string;
}
