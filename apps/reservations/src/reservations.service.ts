import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository, @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    // Send a message to the Payment service to create a charge
    return this.paymentsService.send('create_charge', createReservationDto.charge)
    .pipe( //used to handle the response from the Payments service.If the payment creation request is successful, it moves to the next step (creating a reservation).
      map((res) => { //It creates a new reservation in the reservationsRepository. Additional fields are added to the reservation: timeStamp: The current date/time when the reservation is created. userId: The ID of the user creating the reservation.
      return this.reservationsRepository.create({
        ...createReservationDto,
        timeStamp: new Date(),
        invoiceId: res.id,
        userId
      })
    }))
  }

  async findAll() {
    return this.reservationsRepository.find({})
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({_id})
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneandUpdate({_id}, {$set: updateReservationDto})
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({_id})
  }
}
