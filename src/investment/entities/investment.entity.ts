import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class Investment extends CoreEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  img: string;

  @Column({})
  openingBalance: string;

  @Column({
    nullable: true,
  })
  currentBalance: string;
}
