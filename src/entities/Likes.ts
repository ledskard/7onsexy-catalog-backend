import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";

@Entity("likes")
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;

    @ManyToOne(() => Model, model => model.trackingLikes)
    model: Model;
}