import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const corsAllowedList =
    configService.get<string>('CORS_ALLOWED_LIST')?.split(',') ?? undefined;

  Logger.log(corsAllowedList, 'main.ts');
  app.enableCors({ allowedHeaders: ['content-type'], origin: corsAllowedList });
  await app.listen(3001);
}

bootstrap();
