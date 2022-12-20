import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  password?: string;
}

@InputType()
export class UpdateUserDto {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
}

@InputType()
export class SignInDto {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class UserDto {
  @Field(() => String)
  id: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  token?: string;
}
