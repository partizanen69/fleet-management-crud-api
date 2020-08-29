import { 
    Controller, Post, UsePipes, ValidationPipe, Body, Patch,
} from '@nestjs/common';

import { CreateTripDto, UpdateTripDto } from './trips.dto';
import { TripsService } from './trips.service';
import { Trip } from './trip.schema';

@Controller('trips')
export class TripsController {
    constructor(private  tripsService: TripsService) {}

    @Post('/create-trip')
    @UsePipes(ValidationPipe)
    async createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
        return await this.tripsService.createTrip(createTripDto);
    }

    @Patch('/update-trip')
    @UsePipes(ValidationPipe)
    async startTrip(@Body() updateTripDto: UpdateTripDto): Promise<Trip> {
        return await this.tripsService.updateTrip(updateTripDto);
    }
}