import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { passport } from 'passport';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  const test = process.env.MYSQL_USERNAME;

  const config = new DocumentBuilder()
    .setTitle('Sleack API')
    .setDescription('Sleack 개발을 위한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  // class-validator 쓰는 것을 다 확인해줌
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
  app.use(passport.initialize());
  app.use(passport.session());
  console.log(`listening on port ${test}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
