import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'cards' })
export class Card extends Document {
  @Prop()
  title: string;

  @Prop()
  column_id: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
