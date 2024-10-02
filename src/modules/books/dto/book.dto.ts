import { ArrayNotEmpty, IsArray, IsNotEmpty } from '@nestjs/class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  publishedDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  categoryIds: number[];
}
