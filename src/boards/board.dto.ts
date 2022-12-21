import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateBoardDto {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  readonly author: string;
}

@ObjectType()
export class BoardDto {
  @Field(() => String)
  readonly id: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  readonly author: string;
}
