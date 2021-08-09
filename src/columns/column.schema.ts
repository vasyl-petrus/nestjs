import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Board } from 'src/boards/board.schema';

@ObjectType()
@Schema({ collection: 'columns', timestamps: true })
export class Column extends Document {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => Board, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Board' })
  board: MongooseSchema.Types.ObjectId | Board;
}

export type ColumnDocument = Column & Document;

export const ColumnSchema = SchemaFactory.createForClass(Column);
