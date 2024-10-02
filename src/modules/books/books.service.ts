import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createBook(payload: CreateBookDto, userId: number): Promise<Book> {
    const { title, publishedDate, categoryIds } = payload;
    const existingBook = await this.booksRepository.findOne({
      where: [{ title: title }],
    });
    if (existingBook) {
      throw new BadRequestException('book already exists');
    }

    // Fetch the User entity from the database
    const user = await this.usersRepository.findOneBy({ userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const categories = await this.categoriesRepository.findByIds(categoryIds);

    const newBook = this.booksRepository.create({
      // error
      title,
      publishedDate,
      isApproved: false,
      user: user,
      categories,
    });
    await this.booksRepository.save(newBook);
    return newBook;
  }
}


