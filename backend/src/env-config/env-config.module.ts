import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './env-config.service';
import { IEnvConfigService } from './env-config-service.interface';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: IEnvConfigService,
      useClass: EnvConfigService,
    },
  ],
  exports: [IEnvConfigService],
})
export class EnvConfigModule {}
