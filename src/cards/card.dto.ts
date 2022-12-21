import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Column } from 'src/columns/column.schema';
import User from '../users/user.entity';

@InputType()
export class CreateCardDto {
  @Field()
  title: string;

  @Field(() => String || Column, { nullable: true })
  column: MongooseSchema.Types.ObjectId | Column;

  @Field(() => String || User, { nullable: true })
  readonly author: MongooseSchema.Types.ObjectId | User;
}

@ObjectType()
export class CardDto {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field(() => String || Column)
  column: MongooseSchema.Types.ObjectId | Column;

  @Field(() => String || User, { nullable: true })
  readonly author: MongooseSchema.Types.ObjectId | User;
}
