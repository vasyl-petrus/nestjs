import { Field, ObjectType } from '@nestjs/graphql';
import BaseEntity from '../common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Board from '../users/user.entity';

@ObjectType()
@Entity({
  name: 'columns',
})
class ColumnEntity extends BaseEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @JoinColumn({ name: 'board' })
  @ManyToOne(() => Board, (board) => board.id)
  board: string;
}

export default ColumnEntity;
