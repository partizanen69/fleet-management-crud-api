import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriversModule } from './drivers/drivers.module';
import { CarsModule } from './cars/cars.module';
import { TripsModule } from './trips/trips.module';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/crud-api'),
    DriversModule,
    CarsModule,
    TripsModule,
    RabbitMQModule,
  ],
})
export class AppModule {}