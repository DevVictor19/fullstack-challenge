import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @Length(4, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(11, 11)
  phone_number: string;
}
