import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';
import { TransformInterceptor } from './core/transform.interceptor';
import { PermissionsService } from './permissions/permissions.service';
async function bootstrap() {

  //khởi tạo 
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );


  //config service (dùng biến môi trường)
  const configService = app.get(ConfigService);
  const permissionService = app.get(PermissionsService)

  //dùng file public và định dạng view
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());//validate data

  //set use cookie
  app.use(cookieParser());


  //get reflector
  const reflector = app.get(Reflector);


  //JwtAuthGuard
  app.useGlobalGuards(new JwtAuthGuard(reflector, permissionService));//use guard


  //định dạng cors
  app.enableCors(
    {
      origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      preflightContinue: false,
      credentials: true
    }
  );//enable cors

  //core (định dạng phản hồi)
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2'],
  });//enable versioning


  //chạy
  await app.listen(configService.get<string>("PORT"));
}

//call
bootstrap();
