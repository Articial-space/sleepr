import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { createChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
    apiVersion: '2024-12-18.acacia'
  })
  async createCharge({ amount}: createChargeDto) { //Pull card and amount directly from the createchargeDto

    //This code below is for an old Stripe API charge, add a 'card' parameter to use.
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card
    // })

    // const paymentIntents = await this.stripe.paymentIntents.create({
    //   payment_method: paymentMethod.id,
    //   amount: amount*100,
    //   confirm: true,
    //   payment_method_types: ['card'],
    //   currency: 'usd'
    // })

    const paymentIntents = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa' //token card provide by Stripe
    })
    return paymentIntents
  }
}
