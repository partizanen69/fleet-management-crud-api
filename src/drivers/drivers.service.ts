import { Injectable, BadRequestException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Driver } from './driver.schema';

@Injectable()
export class DriversService {
    constructor(
        @InjectModel(Driver.name) private driverModel: Model<Driver>
    ) {}
    
    async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
        const createdDriver = new this.driverModel(createDriverDto);
        await createdDriver.save();
        
        return createdDriver;
    }

    async updateDriverName(updateDriverDto: UpdateDriverDto): Promise<Driver> {
        const { _id, name } = updateDriverDto;
        
        const isValid = MongooseTypes.ObjectId.isValid(_id);
        if (!isValid) {
            throw new BadRequestException('_id can not be converted to mongodb id');
        } 
        
        const updatedDriver = await this.driverModel.findOneAndUpdate(
            { _id }, 
            { name },
            { new: true, useFindAndModify: false }
        );
        
        if (updatedDriver === null) {
            const msg = 'Database does not contain document with provided _id';
            throw new BadRequestException(msg);
        }

        return updatedDriver;
    }

    async getDriverById(id: string): Promise<Driver> {
        return await this.driverModel.findById(id);
    }
}

export class CreateDriverDto {
    @IsNotEmpty()
    name: string;
}

export class UpdateDriverDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    name: string;
}