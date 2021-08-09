import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Board } from 'src/boards/board.schema';

@InputType()
export class CreateColumnDto {
  @Field()
  title: string;

  @Field(() => String || Board, { nullable: true })
  board: MongooseSchema.Types.ObjectId | Board;
}

@ObjectType()
export class ColumnDto {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field(() => String || Board, { nullable: true })
  board: MongooseSchema.Types.ObjectId | Board;
}
