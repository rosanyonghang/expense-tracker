import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {
    super(transactionRepository);
  }
}
