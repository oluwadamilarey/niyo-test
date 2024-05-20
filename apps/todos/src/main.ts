import { NestFactory } from '@nestjs/core';
import { TodosModule } from './todos.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(TodosModule);
  // const config = new DocumentBuilder()
  //   .setTitle('Todo API')
  //   .setDescription('API for managing todos')
  //   .setVersion('1.0')
  //   .addTag('todos')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
