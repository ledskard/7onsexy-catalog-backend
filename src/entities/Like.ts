import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;

    @ManyToOne(() => Model, model => model.trackingLikes)
    model: Model;
}