import { Field, ObjectType } from '@nestjs/graphql';
import BaseEntity from '../common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import User from '../users/user.entity';

@ObjectType()
@Entity({
  name: 'boards',
})
class BoardEntity extends BaseEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @JoinColumn({ name: 'author' })
  @ManyToOne(() => User, (user) => user.id)
  author: string;
}

export default BoardEntity;
