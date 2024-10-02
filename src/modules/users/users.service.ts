import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(page: number, limit: number, search: string, filter: any): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user');
    // search by username/email
    if (search) {
      query.andWhere('user.username LIKE :search OR user.email LIKE :search',{search: `%${search}`});
    }
    // filter
    if (filter) {
      Object.keys(filter).forEach(key => {
        if (filter[key] !== undefined && filter[key] !== null) {
          query.andWhere(`user.${key} = :${key}`, { [key]: filter[key] });
        }
      });
    }
    if (page && limit){
      const offset = (page - 1)*limit;
      query.limit(limit).offset(offset);
    }
    return await query.getMany();
  }

  async getUserDetails(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.getUserDetails(userId);
    const { username, email, password } = updateUserDto;

    if (username) {
      user.username = updateUserDto.username;
    }
    if (email) {
      user.email = updateUserDto.email;
    }
    if (password) {
      const hashed = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashed;
    }
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(userId: number): Promise<string> {
    const user = await this.usersRepository.delete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return 'delete successfully';
  }
}
