import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("images")
export class Image {

    @PrimaryGeneratedColumn({name: "id"})
    id: string;

    @Column({name:"url"})
    url: string;

    @Column({name:"name"})
    name: string;

    base64?: string;

}
