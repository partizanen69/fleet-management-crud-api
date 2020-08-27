import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Driver } from './driver.schema';

@Injectable()
export class DriversService {
    constructor(
        @InjectModel(Driver.name) private driverModel: Model<Driver>
    ) {}
    
    createDriver(createDriverDto: CreateDriverDto) {
        const createdDriver = new this.driverModel(createDriverDto);
        return createdDriver.save();
    }

}

export class CreateDriverDto {
    @IsNotEmpty()
    name: string;
}