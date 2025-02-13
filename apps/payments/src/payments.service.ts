import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
    constructor(private readonly configService: ConfigService, @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy) {}
    private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
        apiVersion: "2025-01-27.acacia"
    })

    async createCharge({card, amount, email}: PaymentsCreateChargeDto) {
        const paymentIntents = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            confirm: true,
            currency: 'usd',
            payment_method: 'pm_card_visa', //token card provide by Stripe
            automatic_payment_methods: { //as stripe api will auto return an url, this options help to prevent the stripe auto redirect function to none.
                enabled: true,
                allow_redirects: 'never'
            }
        })

        this.notificationsService.emit('notify_email', {email, text: `Dear ${email},\n Your payment of $${amount} has completed sucessfully`})
        return paymentIntents
    }
}
