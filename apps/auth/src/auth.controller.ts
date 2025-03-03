import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { currentUser } from '@app/common';
import { UsersDocument } from '@app/common';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@currentUser() user: UsersDocument,
    @Res({ passthrough: true }) response: Response) { //Get access to current user after authenticated - create a custom decorator // set the jwt as cookie on the response object because http jwt is more secure
      await this.authService.login(user, response)
      response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate') //set up this route so the auth service can be able to receive RPC calls
  async authenticate(@Payload() data: any) {//@Payload will extract the current payload of this message pattern (which is the same for the jwt strategy received.)
    return data.user
  }
}
