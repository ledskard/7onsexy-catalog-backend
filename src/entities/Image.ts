import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Model } from "./Model";

@Entity("images")
export class Image {

    @PrimaryGeneratedColumn({name: "id"})
    id: string;

    @Column({name:"url"})
    url: string;

    @Column({name:"name"})
    name: string;

    base64?: string;

    @ManyToOne(type => Model, model => model.images, { onDelete: "CASCADE" }) 
    @JoinColumn({ name: "model_id" }) 
    model: Model;

}
