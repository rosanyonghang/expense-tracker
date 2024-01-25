import { Controller, UseGuards } from '@nestjs/common';
import { RecurringTransactionService } from './recurring-transaction.service';
import { BaseController } from '../base/base.controller';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../authentication/http/token.guard';

@Controller('recurring-transaction')
@ApiTags('Recurring Transaction')
@UseGuards(TokenGuard)
export class RecurringTransactionController extends BaseController<RecurringTransaction> {
  constructor(
    private readonly recurringTransactionService: RecurringTransactionService,
  ) {
    super(recurringTransactionService);
  }
}
