import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule} from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Chat_App')
    .setDescription('Apis for Chat_App.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    // integrated swagger
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    // enable pipes
  app.useGlobalPipes(
    new ValidationPipe(
      {transform:true}
    )
  )    

  await app.listen(3000);
}
bootstrap();
