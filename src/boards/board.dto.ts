import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateBoardDto {
  @Field()
  readonly title: string;
}

@InputType()
export class BoardDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;
}
