import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, PAYMENTS_SERVICE } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{name: ReservationDocument.name, schema: ReservationSchema}]), LoggerModule.forRoot(
    {
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLines: true
          }
        }
      }
    }
  ),
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
      AUTH_PORT: Joi.number().required(),
      AUTH_HOST: Joi.string().required(),
      PAYMENTS_PORT: Joi.number().required(),
      PAYMENTS_HOST: Joi.string().required()
    })
  }),
  ClientsModule.registerAsync([
    {
      name: AUTH_SERVICE,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get('AUTH_HOST'),
          port: configService.get('AUTH_PORT')
        }
      }),
      inject: [ConfigService]
    },
    {
      name: PAYMENTS_SERVICE,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get('PAYMENTS_HOST'),
          port: configService.get('PAYMENTS_PORT')
        }
      }),
      inject: [ConfigService]
    }
  ]), // we need to register the auth service so that the reservation can recognize it
  // We also have to specify the TCP port in order to create a connection with the auth at TCP port
],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
