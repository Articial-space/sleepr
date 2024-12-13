import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { currentUser } from './users/current-user.decorator';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';

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
}
