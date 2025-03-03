import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from '@app/common';
import { LoggerModule } from 'nestjs-pino';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{name: UsersDocument.name, schema: UsersSchema}]), LoggerModule.forRoot(
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
  )],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
