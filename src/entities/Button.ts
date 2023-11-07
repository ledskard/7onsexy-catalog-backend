import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Image } from "./Image";
import { User } from "./User";
import { Model } from "./Model";

@Entity("buttons")
export class Button {

    @PrimaryGeneratedColumn({name: "id"})
    id: string;

    @Column({name:"url", nullable: true})
    url?: string;
    
    @Column({name:"title", nullable: true})
    title?: string;

    @OneToOne(() => Image, {cascade: true, eager: true, nullable: true})
    @JoinColumn({name: "image_id"})
    image?: Image;

    @ManyToOne(() => Model, model => model.buttons)
    @JoinColumn({name: "user_id"})
    model?: Model | string;

}
