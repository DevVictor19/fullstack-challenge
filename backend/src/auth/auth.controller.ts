import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignupUserDto } from './dtos/signup-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    description: 'Email já está em uso',
    status: HttpStatus.BAD_REQUEST,
  })
  async signup(@Body() dto: SignupUserDto) {
    await this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Email ou senha inválidos',
    status: HttpStatus.UNAUTHORIZED,
  })
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
