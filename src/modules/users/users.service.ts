import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>,
  ) {}

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    if (page && limit) {
      const offset = (page - 1) * limit;
      return await this.usersRespository
        .createQueryBuilder('user')
        .where('user.isAdmin = :isAdmin', { isAdmin: false }) // not get admin 
        .limit(limit)
        .offset(offset)
        .getMany();
    }
    return this.usersRespository.find({ where: { isAdmin: false } });
  }

  async getUserDetails(userId: number): Promise<User> {
    const user = await this.usersRespository.findOneBy({userId});
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDTO): Promise<User> {
    const user = await this.usersRespository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const {username, email, password} = updateUserDto;

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
    await this.usersRespository.save(user);
    return user;
  }
}
