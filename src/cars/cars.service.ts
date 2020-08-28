import { Injectable, BadRequestException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Car } from './car.schema';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<Car>
    ) {}
    
    async createCar(createCarDto) {
        const createdCar = new this.carModel(createCarDto);
        await createdCar.save();
        return createdCar;
    }

    // async updateDriverName(updateDriverDto: UpdateDriverDto): Promise<Driver> {
    //     const { _id, name } = updateDriverDto;
        
    //     const isValid = MongooseTypes.ObjectId.isValid(_id);
    //     if (!isValid) {
    //         throw new BadRequestException('_id can not be converted to mongodb id');
    //     } 
        
    //     const updatedDriver = await this.driverModel.findOneAndUpdate(
    //         { _id }, 
    //         { name },
    //         { new: true, useFindAndModify: false }
    //     );
        
    //     if (updatedDriver === null) {
    //         const msg = 'Database does not contain document with provided _id';
    //         throw new BadRequestException(msg);
    //     }

    //     return updatedDriver;
    // }

    async assignDriver() {
        // check if such driver exists

        // check if such car exists
    }

}

export enum CarStatus {
    ACTIVE = 'ACTIVE',
    IDLE = 'IDLE',
}

export class CreateCarDto {
    @IsNotEmpty()
    name: string;

    assignedDriver: string;

    @IsNotEmpty()
    status: CarStatus;
}

// export class UpdateDriverDto {
//     @IsNotEmpty()
    
//     _id: string;

//     @IsNotEmpty()
//     name: string;
// }