import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  generateToken(userId: number, isAdmin: boolean): string {
    const payload = { id: userId, isAdmin };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async register(registerDto: RegisterDTO): Promise<User> {
    const { username, email, password } = registerDto;

    if (!username || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    // check if username/email already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (existingUser) {
      throw new BadRequestException('email or username already exists');
    }

    const hashed = await bcrypt.hash(registerDto.password, 10);

    const newUser = this.usersRepository.create({
      ...registerDto,
      password: hashed,
      isAdmin: false,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async login(loginDto: LoginDTO): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOne({
      where: [{ username: username}],
    });
    if (!user) {
      throw new NotFoundException('invalid username');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('invalid password');
    }
    return user;
  }
}
