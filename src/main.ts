import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from "path";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(process.cwd(), '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useGlobalPipes(new ValidationPipe({}));

  if (process.env.NODE_ENV == 'development') {
    const config = new DocumentBuilder()
      .setTitle('Reputation Rooster')
      .setDescription('A Reviewing App')
      .setVersion('1.0')
      .addTag('Swagger UI')
      .setVersion('V1')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document);
  } else {
    app.use(helmet());
  }

  await app.listen(5000,'0.0.0.0');
}
bootstrap();
