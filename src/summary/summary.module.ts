import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from '../user-detail/entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, UserDetail])],
  controllers: [SummaryController],
  providers: [TransactionService],
})
export class SummaryModule {}
