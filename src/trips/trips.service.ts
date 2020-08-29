import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Trip } from './trip.schema';
import { CreateTripDto, UpdateTripDto } from './trips.dto';

import { CarsService } from '../cars/cars.service';
import { Car } from 'src/cars/car.schema';
import { TripStatus } from './trips.enum';

@Injectable()
export class TripsService {
    constructor(
        @InjectModel(Trip.name) private tripModel: Model<Trip>,
        private readonly carService: CarsService,
    ) {}
    
    async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
        const { carId, startPoint, endPoint } = createTripDto;

        const { lat: startLat, long: startLong } = this.extractCoordinatesFromStr(startPoint);
        if (startLat === null || startLong === null) {
            throw new BadRequestException('Invalid startPoint coordinates value');
        }

        const { lat: endLat, long: endLong } = this.extractCoordinatesFromStr(endPoint);
        if (endLat === null || endLong === null) {
            throw new BadRequestException('Invalid endPoint coordinates value');
        }

        const isObjectId: Boolean = MongooseTypes.ObjectId.isValid(carId);
        if (!isObjectId) {
            const msg: string = 'carId param can not be converted to mongodb id';
            throw new BadRequestException(msg);
        }
        
        const foundCar: Car = await this.carService.getCarById(carId);
        if (foundCar === null) {
            const msg: string = 'Database does not contain car with provided carId';
            throw new BadRequestException(msg);
        }
 
        const createdTrip = new this.tripModel({
            carId,
            startPoint: { lat: startLat, long: startLong },
            endPoint: { lat: endLat, long: endLong },
            startTime: null,
            endTime: null,
            status: TripStatus.PENDING,
        });
        await createdTrip.save();
        
        return createdTrip;
    }

    async updateTrip(updateTripDto: UpdateTripDto): Promise<Trip> {
        const { tripId, startTime, endTime } = updateTripDto;

        if (!startTime && !endTime) {
            throw new BadRequestException('No update information provided');
        }

        const isObjectId: Boolean = MongooseTypes.ObjectId.isValid(tripId);
        if (!isObjectId) {
            const msg: string = 'tripId param can not be converted to mongodb id';
            throw new BadRequestException(msg);
        }
        
        const foundTrip = await this.tripModel.findById(tripId);
        if (foundTrip === null) {
            const msg: string = 'Database does not contain trip with specified tripId';
            throw new NotFoundException(msg);
        }

        interface UpdateObj {
            status?: TripStatus,
            startTime?: Date,
            endTime?: Date,
        }
        const updateObj: UpdateObj = {};

        if (startTime) {
            const startTimeObj = new Date(startTime);
            if (startTimeObj.toString() === 'Invalid Date') {
                throw new BadRequestException('Invalid startTime value');
            }

            updateObj.startTime = startTimeObj;
            updateObj.status = TripStatus.IN_PROGRESS;
        }
        
        if (endTime) {
            const endTimeObj = new Date(endTime);
            if (endTimeObj.toString() === 'Invalid Date') {
                throw new BadRequestException('Invalid endTime value');
            }

            updateObj.endTime = endTimeObj;
            updateObj.status = TripStatus.COMPLETED;
        }
        
        const updatedTrip: Trip = await this.tripModel.findOneAndUpdate(
            { _id: tripId }, updateObj, { new: true, useFindAndModify: false },
        );

        return updatedTrip;
    }

    private extractCoordinatesFromStr(str: string): { lat: number, long: number } {
        const result = { lat: null, long: null };
        
        const isValid = /^-{0,1}\d{1,2}.\d{6}\/-{0,1}\d{1,2}.\d{6}$/.test(str);
        if (!isValid) return result;

        const lat = +str.slice(0, 10);
        const long = +str.slice(11);

        if (lat <= 90 && lat >= -90) result.lat = lat;
        if (long <= 180 && long >= -180) result.long = long;
        
        return result;
    }
}
