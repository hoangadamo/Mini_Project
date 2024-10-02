import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Book } from './book.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude() // hide password from response
  password: string;

  @Column()
  isAdmin: boolean;

  @OneToMany((type) => Book, (book) => book.user)
  books: Book[];

//   constructor(partial: Partial<User>) {
//     Object.assign(this, partial);
//   }
}
