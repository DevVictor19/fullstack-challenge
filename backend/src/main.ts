import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { IEnvConfigProvider } from './env-config/env-config-provider.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(app.get(IEnvConfigProvider).getServerPort());
}
bootstrap();
