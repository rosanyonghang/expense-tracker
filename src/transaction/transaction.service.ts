import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDetail } from '../user-detail/entities/user-detail.entity';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {
    super(transactionRepository);
  }

  async getMyData(userId: number) {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.userId = :id', { id: userId })
      .getMany();
  }

  async getUserSummary(userId: number) {
    const query = `
      SELECT
        COALESCE(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 0) as totalExpenses,
        COALESCE(SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END), 0) as totalIncome
      FROM transaction
      WHERE "userId" = $1
    `;

    const results = await this.transactionRepository.query(query, [userId]);

    console.log(results);
    const totalExpenses = results[0].totalexpenses || 0;
    const totalIncome = results[0].totalincome || 0;

    const userDetail: any = await this.userDetailRepository
      .createQueryBuilder('userDetail')
      .select('userDetail.openingBalance')
      .where('userDetail.userId = :userId', { userId })
      .getOne();

    const openingBalance = userDetail ? userDetail.openingBalance : 0;
    const maxExpenseQuery: string = `
      SELECT title
      FROM transaction
      WHERE "userId" = $1 AND type = 'EXPENSE'
      GROUP BY title
      ORDER BY SUM(amount) DESC
      LIMIT 1
    `;
    const maxExpense: any = await this.transactionRepository.query(
      maxExpenseQuery,
      [userId],
    );

    const currentMonth = new Date().getMonth() + 1; // January is 0
    const currentYear = new Date().getFullYear();
    const transactionsThisMonthQuery = `
    SELECT COUNT(id) as totalTransactions
    FROM transaction
    WHERE "userId" = $1
      AND EXTRACT(MONTH FROM "createdAt") = $2
      AND EXTRACT(YEAR FROM "createdAt") = $3
  `;

    const transactionsThisMonthResults: any =
      await this.transactionRepository.query(transactionsThisMonthQuery, [
        userId,
        currentMonth,
        currentYear,
      ]);
    const totalTransactionsThisMonth =
      transactionsThisMonthResults[0].totalTransactions || 0;

    return {
      expenses: +totalExpenses,
      income: +totalIncome,
      openingBalance: openingBalance + totalIncome - totalExpenses,
      maxExpense: maxExpense[0] ? maxExpense[0].title : 'No expense recorded',
      totalTransactionsThisMonth: totalTransactionsThisMonth,
    };
  }
}
