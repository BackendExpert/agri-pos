import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class RegistationDTO {
    @IsEmail()
    email!: string

    @IsStrongPassword()
    password!: string
}