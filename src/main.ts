import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfig } from './app.config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({ origin: '*' }));

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: AppConfig.NODE_ENV === 'production' ? true : false,
      transform: true
    }),
  );

  await app.listen(8000);
}
bootstrap();
