import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'boards' })
export class Board extends Document {
  @Prop()
  title: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
