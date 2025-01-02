import { Injectable } from '@nestjs/common';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor (private readonly configService: ConfigService, private readonly jwtService: JwtService) {}
  async login(user: UsersDocument, response: Response) {
    console.log('my data saved')
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString()

    }
    // set expired date for token
    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )
    const token = this.jwtService.sign(tokenPayload) // generate token
    //Set the cookie for the response
    response.cookie('Authentication', token, {
      httpOnly: true //only available on the http request, not the user side
    })

  }
}
