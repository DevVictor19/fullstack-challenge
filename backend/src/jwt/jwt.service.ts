import { Injectable } from '@nestjs/common';
import {
  IJwtService,
  JwtPayload,
  TokenSignOptions,
} from './jwt-service.interface';
import { IEnvConfigProvider } from 'src/env-config/env-config-provider.interface';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService implements IJwtService {
  private readonly secret: string;

  constructor(private readonly EnvConfigProvider: IEnvConfigProvider) {
    this.secret = EnvConfigProvider.getServerJwtSecret();
  }

  public sign({ payload, expiresIn }: TokenSignOptions): string {
    return sign(payload, this.secret, {
      expiresIn,
      algorithm: 'HS256',
    });
  }

  // this method throws an error if token is invalid
  public verify(token: string): JwtPayload | string {
    return verify(token, this.secret);
  }
}
