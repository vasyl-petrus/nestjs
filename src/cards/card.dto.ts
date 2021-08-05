import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCardDto {
  @Field()
  title: string;

  @Field()
  column_id: string;

  @Field()
  readonly author_id: string;
}

@ObjectType()
export class CardDto {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field()
  column_id: string;

  @Field()
  readonly author_id: string;
}
