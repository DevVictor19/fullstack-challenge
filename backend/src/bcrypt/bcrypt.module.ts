import { Global, Module } from '@nestjs/common';
import { BcryptProvider } from './bcrypt.provider';
import { IBcryptProvider } from './bcrypt-service.interface';

@Global()
@Module({
  providers: [
    {
      provide: IBcryptProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [IBcryptProvider],
})
export class BcryptModule {}
