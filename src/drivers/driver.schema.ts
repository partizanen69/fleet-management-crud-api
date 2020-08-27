import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Driver extends Document {
    @Prop({ required: true })
    name: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);