import { Entity, Column, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class Category extends CoreEntity {
  @Column()
  name: string;

  @ManyToOne(() => Category)
  parent: Category;
}
