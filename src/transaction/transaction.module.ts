import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../account/entities/account.entity';
import { UserDetail } from '../user-detail/entities/user-detail.entity';
import { UserDetailModule } from '../user-detail/user-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Account, UserDetail]),
    UserDetailModule,
  ],
  controllers: [TransactionController],
  exports: [TransactionService],
  providers: [TransactionService],
})
export class TransactionModule {}
