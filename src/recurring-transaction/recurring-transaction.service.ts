import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecurringTransactionService extends BaseService<RecurringTransaction> {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly recurringTransaction: Repository<RecurringTransaction>,
  ) {
    super(recurringTransaction);
  }

  async getMyData(userId: number) {
    return this.recurringTransaction
      .createQueryBuilder('recurringTransaction')
      .where('recurringTransaction.userId = :id', { id: userId })
      .getMany();
  }
}
