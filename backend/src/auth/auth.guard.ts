import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { IJwtProvider } from 'src/jwt/jwt-provider.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtProvider: IJwtProvider,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new BadRequestException(
        'Insira o token de autenticação no formato bearer token',
      );
    }

    try {
      const payload = this.jwtProvider.verify(token);

      if (typeof payload === 'string') {
        return false;
      }

      const email: string = payload.user_email;

      const user = await this.usersService.findByEmail(email);

      if (!user) {
        return false;
      }

      request.user = user;

      return true;
    } catch {
      return false;
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
