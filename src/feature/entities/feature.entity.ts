import { Entity, Column, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class Feature extends CoreEntity {
  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
