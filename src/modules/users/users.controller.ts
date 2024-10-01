import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const users = await this.usersService.getAllUsers(page, limit);
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  @Get(':id')
  async getUserDetails(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const user = await this.usersService.getUserDetails(id);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDTO): Promise<any> {
    const user = await this.usersService.updateUser(id, updateUserDto);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.usersService.deleteUser(id);
  }
}
