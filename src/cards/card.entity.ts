import { Field, ObjectType } from '@nestjs/graphql';
import BaseEntity from '../common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import User from '../users/user.entity';
import ColumnEntity from '../columns/column.entity';

@ObjectType()
@Entity({
  name: 'cards',
})
class CardEntity extends BaseEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @JoinColumn({ name: 'author' })
  @ManyToOne(() => User, (user) => user.id)
  author: string;

  @Field()
  @JoinColumn({ name: 'column' })
  @OneToOne(() => ColumnEntity, (column) => column.id)
  column: string;
}

export default CardEntity;
