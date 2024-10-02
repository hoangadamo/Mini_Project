import { Body, ClassSerializerInterceptor, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() registerDto: RegisterDTO): Promise<any>{
        return await this.authService.register(registerDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body() loginDto: LoginDTO): Promise<any> {
        const user = await this.authService.login(loginDto);
        const token = await this.authService.generateToken(user.userId, user.isAdmin);
        return {user, token};
    }
}
