import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService)
  app.connectMicroservice({transport: Transport.TCP,
    options: {
      host: '0.0.0.0', //Bind to all interfaces on the host
      port: configService.get('TCP_PORT')
    }
  })
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.use(cookieParser())
  app.useLogger(app.get(Logger))
  await app.startAllMicroservices()
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();

// solved problem
// The tcp connection was closed, because we havent specify the host and port for the auth to listen
