import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  RecurringType,
  TransactionType,
} from '../../utils/enums/transaction.enum';

export class CreateRecurringTransactionDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty()
  @IsOptional()
  readonly note: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TransactionType, {
    message: 'Income or Expense',
  })
  readonly type: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RecurringType, {
    message: 'Monthly, Weekly or Expense',
  })
  readonly recurringType: string;

  @ApiProperty()
  @IsOptional()
  readonly document: string;

  @ApiProperty()
  @IsString()
  readonly account: string;
}
