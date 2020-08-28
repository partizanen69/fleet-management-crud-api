import { 
    Controller, Post, UsePipes, ValidationPipe, Body,
    // , Get, , , Patch
} from '@nestjs/common';

import { CarsService, CreateCarDto, } from './cars.service';
import { Car } from './car.schema';



@Controller('cars')
export class CarsController {
    constructor(private  carsService: CarsService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createDriver(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return await this.carsService.createCar(createCarDto);
    }
    
    // @Patch('/update-name')
    // @UsePipes(ValidationPipe)
    // async updateDriverName(@Body() updateDriverDto: UpdateDriverDto): Promise<Driver> {
    //     return await this.driversService.updateDriverName(updateDriverDto);
    // }
}
