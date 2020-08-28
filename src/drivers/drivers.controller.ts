import { 
    Controller, Post, Body, Get, UsePipes, ValidationPipe, Patch
} from '@nestjs/common';

import { DriversService, CreateDriverDto, UpdateDriverDto } from './drivers.service';
import { Driver } from './driver.schema';



@Controller('drivers')
export class DriversController {
    constructor(private  driversService: DriversService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createDriver(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
        return await this.driversService.createDriver(createDriverDto);
    }
    
    @Patch('/update-name')
    @UsePipes(ValidationPipe)
    async updateDriverName(@Body() updateDriverDto: UpdateDriverDto): Promise<Driver> {
        return await this.driversService.updateDriverName(updateDriverDto);
    }
}
