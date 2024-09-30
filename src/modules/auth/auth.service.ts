import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    generateToken(userId: string, isAdmin: boolean): string {
        const payload = {id: userId, isAdmin};
        const token = this.jwtService.sign(payload,{
            secret: process.env.JWT_ACCESS_KEY || 'ahbcghsgcvtrsa',
            expiresIn: '15d'
        });
        return token;
    }

    async register(registerDto: RegisterDTO): Promise<User>{
        const { username, email, password } = registerDto;

        if (!username || !email || !password) {
            throw new Error('Missing required fields');
        }

        // check if username/email already exists
        const existingUser = await this.usersRepository.findOne({
            where: [
                {email: registerDto.email},
                {username: registerDto.username}
            ]
        })
        if (existingUser){
            throw new Error('email or username already exists');
        }

        const hashed = await bcrypt.hash(registerDto.password, 10);

        const newUser = this.usersRepository.create({
            ...registerDto,
            password: hashed,
            isAdmin: false
        })
        await this.usersRepository.save(newUser);
        return newUser;
    }
}
