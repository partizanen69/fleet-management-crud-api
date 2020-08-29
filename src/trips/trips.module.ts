import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarsModule } from '../cars/cars.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TripSchema } from './trip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trip', schema: TripSchema }]),
    CarsModule,
  ],
  controllers: [ TripsController ],
  providers: [ TripsService ],
})
export class TripsModule {}