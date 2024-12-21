import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';
import { currentUser } from './current-user.decorator';
import { UsersDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@currentUser() user: UsersDocument) {
        return user
    }
}
