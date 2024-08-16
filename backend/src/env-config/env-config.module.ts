import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigProvider } from './env-config.provider';
import { IEnvConfigProvider } from './env-config-provider.interface';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: IEnvConfigProvider,
      useClass: EnvConfigProvider,
    },
  ],
  exports: [IEnvConfigProvider],
})
export class EnvConfigModule {}
