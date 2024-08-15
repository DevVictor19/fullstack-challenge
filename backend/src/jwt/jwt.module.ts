import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { IJwtService } from './jwt-service.interface';

@Global()
@Module({
  providers: [
    {
      provide: IJwtService,
      useClass: JwtService,
    },
  ],
  exports: [IJwtService],
})
export class JwtModule {}
