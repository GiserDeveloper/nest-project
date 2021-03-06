import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { TransformInterceptor } from './shared/interceptor/transform.interceptor';

import { HttpExceptionFilter } from './shared/filters/httpexception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  //全局注册错误信息过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  //全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  //设置全局前缀
  app.setGlobalPrefix('api/private/v1')

  const options = new DocumentBuilder()
  .setTitle('中铁大桥局一公司市场部大数据智慧平台-后台接口')
  .setDescription('使用NestJS构建的服务端API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  //方便查看接口文档
  console.log('http://localhost:3000/api-docs')
}
bootstrap();
