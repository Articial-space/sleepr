import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge') //listen to the 'create-charge' pattern
  async createCharge(@Payload() data: createChargeDto) {
    return this.paymentsService.createCharge(data)
  }
}
