import { Controller, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { BaseController } from '../base/base.controller';
import { Transaction } from './entities/transaction.entity';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../authentication/http/token.guard';

@Controller('transaction')
@ApiTags('Transaction')
@UseGuards(TokenGuard)
export class TransactionController extends BaseController<Transaction> {
  constructor(private readonly transactionService: TransactionService) {
    super(transactionService);
  }
}
