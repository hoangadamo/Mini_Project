import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto';
import { CustomRequest } from 'src/middlewares/jwt.middleware';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() payload: CreateBookDto, @Req() req: CustomRequest){
    return await this.booksService.createBook(payload, req.user.id);
  }

  
}
