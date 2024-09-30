import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    categoryName: string;

    @OneToMany(type => Book, book => book.category)
    books: Book[]
}