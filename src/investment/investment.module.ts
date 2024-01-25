import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { InvestmentLog } from './entities/investment-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investment, InvestmentLog])],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule{}