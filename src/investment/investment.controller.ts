import { Controller, UseGuards } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { BaseController } from '../base/base.controller';
import { Investment } from './entities/investment.entity';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../authentication/http/token.guard';

@Controller('investment')
@ApiTags('Investment')
@UseGuards(TokenGuard)
export class InvestmentController extends BaseController<Investment> {
  constructor(private readonly investmentService: InvestmentService) {
    super(investmentService);
  }
}
