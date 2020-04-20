import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

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
