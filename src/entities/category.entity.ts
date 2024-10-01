import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    categoryName: string;

    @ManyToMany(() => Book, (book) => book.categories)
    books: Book[]
}