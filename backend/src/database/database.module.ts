import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEnvConfigService } from 'src/env-config/env-config-service.interface';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envConfigService: IEnvConfigService) => ({
        type: 'postgres',
        host: envConfigService.getDatabaseHost(),
        port: envConfigService.getDatabasePort(),
        username: envConfigService.getDatabaseUser(),
        password: envConfigService.getDatabasePass(),
        database: envConfigService.getDatabaseName(),
        entities: [User],
        synchronize: true, // only in development!
      }),
      inject: [IEnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
