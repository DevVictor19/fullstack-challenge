import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { IEnvConfigProvider } from 'src/env-config/env-config-provider.interface';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envConfigProvider: IEnvConfigProvider) => ({
        type: 'postgres',
        host: envConfigProvider.getDatabaseHost(),
        port: envConfigProvider.getDatabasePort(),
        username: envConfigProvider.getDatabaseUser(),
        password: envConfigProvider.getDatabasePass(),
        database: envConfigProvider.getDatabaseName(),
        entities: [User, Client],
        synchronize: true, // only in development!
      }),
      inject: [IEnvConfigProvider],
    }),
  ],
})
export class DatabaseModule {}
