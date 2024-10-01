import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";
import { MinLength } from "class-validator";

export class RegisterDTO {
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}