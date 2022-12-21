import { Field, InputType, ObjectType } from '@nestjs/graphql';
import Column from 'src/columns/column.entity';
import User from '../users/user.entity';

@InputType()
export class CreateCardDto {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  column: string;

  @Field(() => String, { nullable: true })
  readonly author: string;
}

@ObjectType()
export class CardDto {
  @Field()
  _id: string;

  @Field()
  title: string;

  @Field(() => String || Column)
  column: string | Column;

  @Field(() => String || User, { nullable: true })
  readonly author: string | User;
}
