import { Field, InputType } from '@nestjs/graphql';
import { TokenTypesEnum } from './token.entity';

@InputType()
export class UserTokenDto {
  @Field()
  user_id: string;

  @Field()
  token: string;

  @Field()
  expires_at: Date;

  @Field()
  type: TokenTypesEnum;
}
