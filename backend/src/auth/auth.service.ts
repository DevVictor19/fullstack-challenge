import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IBcryptService } from 'src/bcrypt/bcrypt-service.interface';
import { IJwtProvider } from 'src/jwt/jwt-service.interface';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignupUserDto } from './dtos/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtProvider: IJwtProvider,
    private readonly bcryptService: IBcryptService,
    private readonly usersService: UsersService,
  ) {}

  public async signup({ email, password }: SignupUserDto) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Esse email já está cadastrado');
    }

    const hashedPass = await this.bcryptService.hash(password);

    await this.usersService.create({ email, password: hashedPass });
  }

  public async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isValidPass = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isValidPass) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = {
      user_email: user.email,
    };

    const token = this.JwtProvider.sign({ payload, expiresIn: '2h' });

    return {
      token,
    };
  }
}
