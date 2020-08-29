import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { CarStatus } from './cars.enum';

export class CreateCarDto {
    @IsNotEmpty()
    name: string;

    assignedDriver: string | null;
}

export class AssignDriverDto {
    @IsNotEmpty()
    carId: string;

    assignedDriver: string;
}

export class ChangeCarStatusDto {
    @IsNotEmpty()
    carId: string;

    @IsNotEmpty()
    @Transform((name) => name.toUpperCase())
    status: CarStatus;
}