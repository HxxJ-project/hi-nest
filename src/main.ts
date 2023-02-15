import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator가 없는 property의 object를 차단
      forbidNonWhitelisted: true, // 누군가 이상한걸 보내면 리퀘스트 자체를 차단
      transform: true, // 유저가 보낸 값을 우리가 원하는 타입으로 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
