import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTripDto {
    @IsNotEmpty()
    carId: string;

    @IsNotEmpty()
    startPoint: string; /* lat/long e.g. 65.55/95.33 */

    @IsNotEmpty()
    endPoint: string; /* lat/long e.g. 65.55/95.33 */
}

export class UpdateTripDto {
    @IsNotEmpty()
    tripId: string;

    startTime: string;
    endTime: string;
}