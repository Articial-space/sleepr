/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthController { 
    @Get()
    Health() {
        return true
    }
 }
