import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/entities/user.entity';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerDto: RegisterDTO): Promise<User>{
        return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDTO): Promise<any> {
        const user = await this.authService.login(loginDto);
        const token = this.authService.generateToken(user.userId, user.isAdmin);
        const {password, ...userWithoutPassword} = user;
        return {user: userWithoutPassword, token}
    }
}
