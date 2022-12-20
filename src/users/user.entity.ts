import { Field, ObjectType } from '@nestjs/graphql';
import BaseEntity from '../common/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import Token from '../token/token.entity';

@ObjectType()
@Entity({
  name: 'users',
})
class UserEntity extends BaseEntity {
  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Token])
  @OneToMany(() => Token, (token) => token.user_id)
  tokens: Token[];
}

export default UserEntity;
