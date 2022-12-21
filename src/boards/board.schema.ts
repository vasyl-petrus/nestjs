import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import User from '../users/user.entity';
@ObjectType()
@Schema({ collection: 'boards', timestamps: true })
export class Board {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  author: MongooseSchema.Types.ObjectId | User;
}

export type BoardDocument = Board & Document;

export const BoardSchema = SchemaFactory.createForClass(Board);
