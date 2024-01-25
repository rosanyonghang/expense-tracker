import { Entity, Column, ManyToOne, DeleteDateColumn } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Category extends CoreEntity {
  @Column()
  title: string;

  @ManyToOne(() => Category)
  parent: Category;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: Date;
}
