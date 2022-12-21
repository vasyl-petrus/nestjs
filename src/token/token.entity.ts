import { Field, ObjectType } from '@nestjs/graphql';
import BaseEntity from '../common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import User from '../users/user.entity';

export enum TokenTypesEnum {
  auth = 'auth',
  confirmEmail = 'confirm_email',
  forgotPassword = 'forgot_password',
}

type TokenTypes = 'forgot_password' | 'confirm_email' | 'auth';

@ObjectType()
@Entity({
  name: 'tokens',
})
class TokenEntity extends BaseEntity {
  @Field()
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.id)
  user_id: string;

  @Field()
  @Column()
  token: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ['forgot_password', 'confirm_email', 'auth'],
  })
  type: TokenTypes;

  @Field()
  @Column()
  expires_at: Date;
}

export default TokenEntity;
