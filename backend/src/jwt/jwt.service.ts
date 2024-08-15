import { Injectable } from '@nestjs/common';
import {
  IJwtService,
  JwtPayload,
  TokenSignOptions,
} from './jwt-service.interface';
import { IEnvConfigService } from 'src/env-config/env-config-service.interface';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService implements IJwtService {
  private readonly secret: string;

  constructor(private readonly envConfigService: IEnvConfigService) {
    this.secret = envConfigService.getServerJwtSecret();
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
