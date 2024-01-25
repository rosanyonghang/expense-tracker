import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import {
  RecurringType,
  TransactionType,
} from '../../utils/enums/transaction.enum';

@Entity()
export class RecurringTransaction extends CoreEntity {
  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: true,
  })
  note: string;

  @Column({
    nullable: true,
  })
  img: string;

  @Column({
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: RecurringType,
    default: RecurringType.MONTHLY,
  })
  recurringType: RecurringType;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.EXPENSE,
  })
  type: TransactionType;

  @Column({
    nullable: false,
  })
  recurringDate: Date;

  @ManyToOne(() => User)
  user: User;
}
