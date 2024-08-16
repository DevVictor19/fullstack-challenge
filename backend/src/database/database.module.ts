import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEnvConfigProvider } from 'src/env-config/env-config-provider.interface';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (EnvConfigProvider: IEnvConfigProvider) => ({
        type: 'postgres',
        host: EnvConfigProvider.getDatabaseHost(),
        port: EnvConfigProvider.getDatabasePort(),
        username: EnvConfigProvider.getDatabaseUser(),
        password: EnvConfigProvider.getDatabasePass(),
        database: EnvConfigProvider.getDatabaseName(),
        entities: [User],
        synchronize: true, // only in development!
      }),
      inject: [IEnvConfigProvider],
    }),
  ],
})
export class DatabaseModule {}
