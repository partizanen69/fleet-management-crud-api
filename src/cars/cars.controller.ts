import { 
    Controller, Post, UsePipes, ValidationPipe, Body, Patch,
} from '@nestjs/common';

import { CreateCarDto, AssignDriverDto, ChangeCarStatusDto } from './cars.dto';
import { CarsService } from './cars.service';
import { Car } from './car.schema';

@Controller('cars')
export class CarsController {
    constructor(private  carsService: CarsService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return await this.carsService.createCar(createCarDto);
    }
    
    @Patch('/assign-driver')
    @UsePipes(ValidationPipe)
    async asssignDriverToTheCar(@Body() assignDriverDto: AssignDriverDto): Promise<Car> {
        return await this.carsService.asssignDriverToTheCar(assignDriverDto);
    }

    @Patch('/change-car-status')
    @UsePipes(new ValidationPipe({ transform: true }))
    async chnageCarStatus(@Body() changeCarStatusDto: ChangeCarStatusDto): Promise<Car> {
        return await this.carsService.changeCarStatus(changeCarStatusDto);
    }
}