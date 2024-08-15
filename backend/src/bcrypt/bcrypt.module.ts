import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { IBcryptService } from './bcrypt-service.interface';

@Global()
@Module({
  providers: [
    {
      provide: IBcryptService,
      useClass: BcryptService,
    },
  ],
  exports: [IBcryptService],
})
export class BcryptModule {}
