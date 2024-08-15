import { IsEmail, IsString, Length } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 100)
  password: string;
}
