import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3095;
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
  app.use(cookieParser());
  // session 의 secret을 쓰려면 cookieparser가 있어야했다.
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  // passport.initialize() 쓰려면 session 이 있어야 했다.
  app.use(passport.initialize());
  app.use(passport.session());
  console.log(`listening on port ${test}`);

  await app.listen(port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
