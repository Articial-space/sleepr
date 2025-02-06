import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PaymentsService } from 'apps/payments/src/payments.service';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, of } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository, @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsService.send('create_charge', createReservationDto.charge).pipe(
      map((res) => {
        return this.reservationsRepository.create({
          ...createReservationDto,
          timeStamp: new Date(),
          invoiceId: res.id,
          userId,

        })
      }),
      catchError((err) => {
        console.log(err)
        return of(false)
      })
    )
  }

  findAll() {
    return this.reservationsRepository.find({})
  }

  findOne(_id: string) {
    return this.reservationsRepository.findOne({_id})
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneandUpdate({_id}, {$set: updateReservationDto})
  }

  remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({_id})
  }
}
