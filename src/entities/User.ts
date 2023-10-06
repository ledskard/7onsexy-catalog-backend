import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {AfterLoad, BeforeInsert} from "typeorm/index";
import { hashSync } from "bcrypt"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn({ name: "id" })
    id: string;

    @Column({ name:"username", unique: true })
    username: string;

    @Column({ name: "password" })
    password: string;
     
    @AfterLoad()
    loadTempPassword() {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    hashPassword() {
        if (this.password !== this.tempPassword) this.password = hashSync(this.password, 8);
    }
    public tempPassword?: string;
}
