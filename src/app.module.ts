import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriversModule } from './drivers/drivers.module';
import { CarsModule } from './cars/cars.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/crud-api'),
    DriversModule,
    CarsModule,
  ],
})
export class AppModule {}


// change status, notify about status change microservice_b
// microservice_b generates heartbeats only for working cars

// route /trips

//trip
  // id
  // car
  // start point (coordinates)
  // end point (coordinates)
  // start time
  // end time
  // status: pending, in progress, completed
// register trip
// start trip (start time is updated and status is set to in progress)
// end trip (end time is updated and end time is set)

// microservice_2 keeps in memory the list of all active cars
