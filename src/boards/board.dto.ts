import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateBoardDto {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  readonly author: MongooseSchema.Types.ObjectId;
}

@ObjectType()
export class BoardDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  readonly author: MongooseSchema.Types.ObjectId;
}
