import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'), //this will be the sender email we setup
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
      accessToken: this.configService.get('GOOGLE_OAUTH_ACCESS_TOKEN')
    }
  })
  async notifyEmail({email, text}: NotifyEmailDto) {
    console.log(email)
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Successfully Charged!',
      text
    })
  } 
}
