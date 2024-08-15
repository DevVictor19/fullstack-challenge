import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from 'src/env-config/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        type: 'postgres',
        host: envConfigService.getDatabaseHost(),
        port: envConfigService.getDatabasePort(),
        username: envConfigService.getDatabaseUser(),
        password: envConfigService.getDatabasePass(),
        database: envConfigService.getDatabaseName(),
        entities: [],
        synchronize: true, // only in development!
      }),
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
