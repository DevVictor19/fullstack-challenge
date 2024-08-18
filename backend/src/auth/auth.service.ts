import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IBcryptProvider } from 'src/bcrypt/bcrypt-provider.interface';
import { IJwtProvider } from 'src/jwt/jwt-provider.interface';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignupUserDto } from './dtos/signup-user.dto';
import { LoginUserResponseDto } from './dtos/login-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtProvider: IJwtProvider,
    private readonly bcryptProvider: IBcryptProvider,
    private readonly usersService: UsersService,
  ) {}

  public async signup({ email, password }: SignupUserDto): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Esse email já está cadastrado');
    }

    const hashedPass = await this.bcryptProvider.hash(password);

    await this.usersService.create({ email, password: hashedPass });
  }

  public async login({
    email,
    password,
  }: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isValidPass = await this.bcryptProvider.compare(
      password,
      user.password,
    );

    if (!isValidPass) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = {
      user_email: user.email,
    };

    const token = this.jwtProvider.sign({ payload, expiresIn: '2h' });

    return {
      token,
    };
  }
}
