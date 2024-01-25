import { Entity, Column } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class Testimonial extends CoreEntity {
  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  designation: string;

  @Column()
  description: string;
}
