import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository, @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timeStamp: new Date(),
      userId
    })
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
