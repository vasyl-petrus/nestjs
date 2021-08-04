import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
@ObjectType()
@Schema({ collection: 'boards', timestamps: true })
export class Board {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;
}

export type BoardDocument = Board & Document;

export const BoardSchema = SchemaFactory.createForClass(Board);
