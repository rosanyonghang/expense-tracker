import { CoreEntity } from '../../base/entities/base.entity';
import { Entity, Column, DeleteDateColumn } from 'typeorm';
import { Exclude } from "class-transformer";

@Entity()
export class Account extends CoreEntity {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  img?: string;

  @Column()
  openingBalance: number;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: Date;
}
