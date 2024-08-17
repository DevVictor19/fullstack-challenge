import {
  IsEmail,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateContactDto {
  @IsPositive()
  client_id: number;

  @IsString()
  @Length(4, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsNumberString({ no_symbols: true })
  @Length(11, 11)
  phone_number: string;
}
