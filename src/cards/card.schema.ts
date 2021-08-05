import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ collection: 'cards', timestamps: true })
export class Card {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  title: string;
  @Field()
  @Prop()
  column_id: string;

  @Field()
  @Prop()
  author_id: string;
}

export type CardDocument = Card & Document;

export const CardSchema = SchemaFactory.createForClass(Card);
