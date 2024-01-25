import { CoreEntity } from '../../base/entities/base.entity';
import { Entity, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Account extends CoreEntity {
  @Column()
  title: string;

  @Column()
  img: string;

  @Column()
  openingBalance: string;

  @DeleteDateColumn()
  public deletedAt: Date;
}
