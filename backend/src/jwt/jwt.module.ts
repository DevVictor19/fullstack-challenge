import { Global, Module } from '@nestjs/common';
import { JwtProvider } from './jwt.provider';
import { IJwtProvider } from './jwt-service.interface';

@Global()
@Module({
  providers: [
    {
      provide: IJwtProvider,
      useClass: JwtProvider,
    },
  ],
  exports: [IJwtProvider],
})
export class JwtModule {}
