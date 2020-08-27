import { Controller, Post, Body, Get, UsePipes, ValidationPipe } from '@nestjs/common';

import { DriversService, CreateDriverDto } from './drivers.service';


@Controller('drivers')
export class DriversController {
    constructor(private  driversService: DriversService) {}

    @Get()
    pingPong() {
        return 'something'
    }
    
    @Post('/create')
    @UsePipes(ValidationPipe)
    async createDriver(@Body() createDriverDto: CreateDriverDto) {
        return await this.driversService.createDriver(createDriverDto);
    }
}
