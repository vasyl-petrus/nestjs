import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserTokenDto {
  @Field()
  user_id: number;

  @Field()
  token: string;

  @Field()
  expires_at: Date;
}
