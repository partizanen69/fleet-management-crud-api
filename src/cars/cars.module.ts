import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriversModule } from '../drivers/drivers.module';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car, CarSchema } from './car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    DriversModule,
  ],
  controllers: [ CarsController ],
  providers: [ CarsService ],
  exports: [ CarsService ],
})

export class CarsModule {}