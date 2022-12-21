import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Column } from 'src/columns/column.schema';
import User from '../users/user.entity';

@ObjectType()
@Schema({ collection: 'cards', timestamps: true })
export class Card {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field({ nullable: true })
  @Prop()
  title: string;

  @Field(() => Column, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Column' })
  column: MongooseSchema.Types.ObjectId | Column;

  @Field(() => User, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  author: MongooseSchema.Types.ObjectId | User;
}

export type CardDocument = Card & Document;

export const CardSchema = SchemaFactory.createForClass(Card);
