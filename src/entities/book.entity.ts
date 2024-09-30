import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { User } from "./user.entity";

@Entity({name: 'books'})
export class Book {
    @PrimaryGeneratedColumn()
    bookId: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column()
    publishedDate: Date;

    @Column()
    isApproved: boolean;

    @ManyToOne(type => User, user => user.books)
    @JoinColumn({name: 'userId'}) // set name to be userId
    user: User

    @ManyToOne(type => Category, category => category.books)
    @JoinColumn({name: 'categoryId'})
    category: Category
}