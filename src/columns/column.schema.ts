import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ collection: 'columns', timestamps: true })
export class Column extends Document {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field()
  @Prop()
  board_id: string;
}

export type ColumnDocument = Column & Document;

export const ColumnSchema = SchemaFactory.createForClass(Column);
