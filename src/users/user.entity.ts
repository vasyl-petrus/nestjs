import { Field, ObjectType } from '@nestjs/graphql';
import BaseEntity from '../common/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import Token from '../token/token.entity';
import BoardEntity from '../boards/board.entity';

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

  @Field(() => [BoardEntity])
  @OneToMany(() => BoardEntity, (board) => board.author)
  boards: BoardEntity[];
}

export default UserEntity;
