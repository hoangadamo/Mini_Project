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
      title,
      publishedDate,
      isApproved: false,
      user: user,
      categories,
    });
    await this.booksRepository.save(newBook);
    return newBook;
  }

  async getAllBooks(page: number, limit: number, search: string, filter: any): Promise<Book[]> {
    const query = this.booksRepository.createQueryBuilder('book');
    // search by username/email
    if (search) {
      query.andWhere('book.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` });
    }
    // filter
    if (filter) {
      Object.keys(filter).forEach(key => {
        if (filter[key] !== undefined && filter[key] !== null) {
          query.andWhere(`book.${key} = :${key}`, { [key]: filter[key] });
        }
      });
    }
    if (page && limit){
      const offset = (page - 1)*limit;
      query.limit(limit).offset(offset);
    }
    return await query.getMany();
  }
}


