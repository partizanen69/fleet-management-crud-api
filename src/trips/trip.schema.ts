import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';

import { TripStatus } from './trips.enum';

@Schema()
export class Trip extends Document {
    @Prop({ required: true })
    carId: MongooseTypes.ObjectId;

    @Prop()
    startPoint: {
        required: true, /* this does not work */
        lat: { type: number, required: true },
        long: { type: number, required: true },
    }

    @Prop()
    endPoint: {
        required: true, /* this does not work */
        lat: { type: number, required: true },
        long: { type: number, required: true },
    };

    @Prop()
    startTime: Date;
    
    @Prop()
    endTime: Date;

    @Prop({ required: true })
    status: TripStatus;
}

export const TripSchema = SchemaFactory.createForClass(Trip);