import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    constructor(private readonly configService: ConfigService) {}
    private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
        apiVersion: "2025-01-27.acacia"
    })

    async createCharge({card, amount}: CreateChargeDto) {
        const paymentIntents = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            confirm: true,
            currency: 'usd',
            payment_method: 'pm_card_visa', //token card provide by Stripe
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        })
        return paymentIntents
    }
}
