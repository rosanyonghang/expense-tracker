import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Account } from '../../account/entities/account.entity';
import { TransactionType } from '../../utils/enums/transaction.enum';
import { RecurringTransaction } from '../../recurring-transaction/entities/recurring-transaction.entity';

@Entity()
export class Transaction extends CoreEntity {
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
  document: string;

  @Column({
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.EXPENSE,
  })
  type: TransactionType;

  @OneToOne(() => Account)
  account: Account;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => RecurringTransaction)
  recurringTransaction: RecurringTransaction;
}
