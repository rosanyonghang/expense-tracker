import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class InvestmentLog extends CoreEntity {

  @Column({
    nullable: true,
  })
  previousAmount: string;

  @Column({
    nullable: true,
  })
  newAmount: string;
}
