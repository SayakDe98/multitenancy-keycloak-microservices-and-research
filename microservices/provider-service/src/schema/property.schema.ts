import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Property extends Document {
  @Prop({ required: true, unique: true })
  property: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  cost: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
