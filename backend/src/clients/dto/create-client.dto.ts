import { IsEmail, IsISO8601, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @Length(4, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(11, 11)
  phone_number: string;

  @IsISO8601()
  created_at: Date;
}
