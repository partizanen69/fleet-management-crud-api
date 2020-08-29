import { Injectable, BadRequestException } from '@nestjs/common';

import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Car } from './car.schema';
import { CreateCarDto, AssignDriverDto, ChangeCarStatusDto } from './cars.dto';
import { CarStatus } from './cars.enum';

import { DriversService } from '../drivers/drivers.service';
import { Driver } from 'src/drivers/driver.schema';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<Car>,
        private readonly driversService: DriversService
    ) {}
    
    async createCar(createCarDto: CreateCarDto): Promise<Car> {
        let { name, assignedDriver } = createCarDto;
        
        if (assignedDriver) {
            const isObjectId: Boolean = MongooseTypes.ObjectId.isValid(assignedDriver);
            if (!isObjectId) {
                const msg: string = 'assignedDriver param can not be converted to mongodb id';
                throw new BadRequestException(msg);
            } 

            const foundDriver: Driver = await this.driversService.getDriverById(assignedDriver);
            if (!foundDriver) {
                const msg: string = `Driver with id ${assignedDriver} does not exist`;
                throw new BadRequestException(msg);
            }
        }
        
        const createdCar = new this.carModel({
            name,
            assignedDriver: assignedDriver || null,
            status: 'IDLE',
        });
        await createdCar.save();
        
        return createdCar;
    }

    async asssignDriverToTheCar(assignDriverDto: AssignDriverDto): Promise<Car> {
        const { carId, assignedDriver } = assignDriverDto;

        const isObjectId: Boolean = MongooseTypes.ObjectId.isValid(carId);
        if (!isObjectId) {
            const msg: string = 'carId param can not be converted to mongodb id';
            throw new BadRequestException(msg);
        } 

        if (assignedDriver) {
            const isObjectId: Boolean = MongooseTypes.ObjectId.isValid(assignedDriver);
            if (!isObjectId) {
                const msg: string = 'assignedDriver param can not be converted to mongodb id';
                throw new BadRequestException(msg);
            } 
            
            const foundDriver: Driver = await this.driversService.getDriverById(assignedDriver);
            if (foundDriver === null) {
                const msg: string = `Driver with id ${assignedDriver} does not exist`;
                throw new BadRequestException(msg);
            }
        }

        interface LooseObject {
            assignedDriver: MongooseTypes.ObjectId,
            [key: string]: any,
        }
        const updateObj: LooseObject = { 
            assignedDriver: assignedDriver ? MongooseTypes.ObjectId(assignedDriver) : null,
        };
        if (!assignedDriver) updateObj.status = 'IDLE';

        const updatedCar = await this.carModel.findOneAndUpdate(
            { _id: carId },  updateObj, { new: true, useFindAndModify: false },
        );
        
        if (updatedCar === null) {
            const msg = 'Database does not contain car with provided carId';
            throw new BadRequestException(msg);
        }

        return updatedCar;
    }

    async changeCarStatus(changeCarStatusDto: ChangeCarStatusDto): Promise<Car>{
        const { carId, status } = changeCarStatusDto;

        const isObjectId: Boolean = MongooseTypes.ObjectId.isValid(carId);
        if (!isObjectId) {
            const msg: string = 'carId param can not be converted to mongodb id';
            throw new BadRequestException(msg);
        }

        const isStatus: Boolean = status in CarStatus;
        if (!isStatus) throw new BadRequestException('Invalid status value');        

        const foundCar: Car = await this.carModel.findById(carId);
        if (foundCar === null) {
            const msg: string = 'Database does not contain car with provided carId';
            throw new BadRequestException(msg);
        }

        if (!foundCar.assignedDriver) {
            const msg: string = 'It is forbidden to change status of a car without ' +
                'assigned driver';
            throw new BadRequestException(msg);
        }
        
        const updatedCar: Car = await this.carModel.findOneAndUpdate(
            { _id: carId }, 
            { status },
            { new: true, useFindAndModify: false }
        );

        return updatedCar;
    }

    async getCarById(id: string): Promise<Car> {
        return await this.carModel.findById(id);
    }
}
