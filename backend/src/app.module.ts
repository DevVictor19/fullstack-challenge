import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule],
})
export class AppModule {}
