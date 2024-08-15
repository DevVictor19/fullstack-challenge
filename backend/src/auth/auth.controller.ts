import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignupUserDto } from './dtos/signup-user.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupUserDto) {
    await this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
