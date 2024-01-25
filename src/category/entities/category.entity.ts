import { Entity, Column, ManyToOne, DeleteDateColumn } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class Category extends CoreEntity {
  @Column()
  title: string;

  @ManyToOne(() => Category)
  parent: Category;

  @DeleteDateColumn()
  public deletedAt: Date;
}
