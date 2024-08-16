import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvConfigProvider } from './env-config-provider.interface';

@Injectable()
export class EnvConfigProvider implements IEnvConfigProvider {
  constructor(private readonly configService: ConfigService) {}

  public getServerPort(): number {
    return this.configService.getOrThrow<number>('SERVER_PORT', {
      infer: true,
    });
  }

  public getServerJwtSecret(): string {
    return this.configService.getOrThrow<number>('SERVER_JWT_SECRET', {
      infer: true,
    });
  }

  public getDatabaseUser(): string {
    return this.configService.getOrThrow<string>('DATABASE_USER', {
      infer: true,
    });
  }

  public getDatabasePass(): string {
    return this.configService.getOrThrow<string>('DATABASE_PASS', {
      infer: true,
    });
  }

  public getDatabasePort(): number {
    return this.configService.getOrThrow<number>('DATABASE_PORT', {
      infer: true,
    });
  }

  public getDatabaseHost(): string {
    return this.configService.getOrThrow<string>('DATABASE_HOST', {
      infer: true,
    });
  }

  public getDatabaseName(): string {
    return this.configService.getOrThrow<string>('DATABASE_NAME', {
      infer: true,
    });
  }
}
