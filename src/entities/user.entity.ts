import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Book } from "./book.entity";

@Entity({name: 'users'})
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @OneToMany(type => Book, book => book.user)
    books: Book[]
}