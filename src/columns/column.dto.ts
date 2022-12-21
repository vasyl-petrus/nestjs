import { Field, InputType, ObjectType } from '@nestjs/graphql';
import Board from '../boards/board.entity';

@InputType()
export class CreateColumnDto {
  @Field()
  title: string;

  @Field(() => String || Board, { nullable: true })
  board: string;
}

@ObjectType()
export class ColumnDto {
  @Field(() => String)
  id: string;

  @Field()
  title: string;

  @Field(() => String || Board, { nullable: true })
  board: string;
}
