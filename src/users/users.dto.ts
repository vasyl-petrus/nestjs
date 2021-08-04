import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

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
  _id: MongooseSchema.Types.ObjectId;
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
