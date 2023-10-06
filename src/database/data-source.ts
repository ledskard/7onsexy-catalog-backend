import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Image } from "../entities/Image";
import { Model } from "../entities/Model";


require('dotenv').config();

export const AppDataSource =  new DataSource({
    type: "mysql",
    host: process.env.HOST_DB,
    port: 3306,
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE,
    entities: [User, Image, Model],
    migrations: ["src/migrations/*.**"],    
});