import { IsNotEmpty, MinLength } from "@nestjs/class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}