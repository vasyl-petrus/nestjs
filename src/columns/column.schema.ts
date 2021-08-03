import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'columns' })
export class Column extends Document {
  @Prop()
  title: string;

  @Prop()
  board_id: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
