import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Book } from "./book.entity";
import { MinLength } from "@nestjs/class-validator";

@Entity({name: 'users'})
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    @MinLength(5)
    username: string; // unique, required

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @OneToMany(type => Book, book => book.user)
    books: Book[]
}