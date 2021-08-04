import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UserTokenDto {
  @Field()
  user_id: MongooseSchema.Types.ObjectId;

  @Field()
  token: string;

  @Field()
  expires_at: Date;
}
