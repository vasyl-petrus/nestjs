import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateColumnDto {
  @Field()
  title: string;

  @Field(() => String)
  board_id: string;
}

@ObjectType()
export class ColumnDto {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field(() => String)
  board_id: string;
}
