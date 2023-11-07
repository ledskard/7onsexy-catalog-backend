import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Model } from "./Model";

@Entity("feature_flags")
export class FeatureFlags {

    @PrimaryGeneratedColumn({name: "id"})
    id: string;

    @Column({name:"name"})
    name: string;

    @Column({name:"description"})
    description: string;

    @CreateDateColumn({ name: 'created_at' }) 
    created_at: Date;

    @ManyToMany(() => Model, model => model.featureFlags)
    models?: Model[];

}