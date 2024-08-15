import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    JwtModule,
    AuthModule,
    BcryptModule,
  ],
})
export class AppModule {}
