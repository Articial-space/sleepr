import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';



@Module({
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            PORT: Joi.number().required(),
            SMTP_USER: Joi.string().required(),
            GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
            GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
            GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required(),
            GOOGLE_OAUTH_ACCESS_TOKEN: Joi.string().required()

          })
        }),
    LoggerModule.forRoot({ //this should be import @app/common, this Logger for finding out the bug.
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLines: true
          }
        }
      }
    })
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
