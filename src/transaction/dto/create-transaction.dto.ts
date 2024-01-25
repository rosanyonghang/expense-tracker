import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../../utils/enums/transaction.enum';

export class CreateTransactionDto {
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
  readonly document: string;

  @ApiProperty()
  @IsNumber()
  readonly account: number;

  @ApiProperty()
  @IsOptional()
  readonly recurringTransaction: number;
}
