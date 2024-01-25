import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Investment } from './entities/investment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvestmentService extends BaseService<Investment> {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {
    super(investmentRepository);
  }
}
