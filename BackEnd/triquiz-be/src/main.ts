import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // NOTE: 정의되지 않은 data는 validator 에 도달하지 않음.
    forbidNonWhitelisted: true, // NOTE: 정의되지 않은 data 는 request 자체를 막음.
    transform: true, // NOTE: uri 로 전달 받은 값은 string 인데, 이를 전달 받을 때 정한 타입으로 자동으로 변환.
  }));
  await app.listen(8000);
}
bootstrap();
