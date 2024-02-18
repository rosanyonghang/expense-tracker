import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Investment } from './entities/investment.entity';
import { BaseController } from '../base/base.controller';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Controller('investment')
@ApiTags('Investment')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class InvestmentController extends BaseController<Investment> {
  constructor(private readonly investmentService: InvestmentService) {
    super(investmentService);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateInvestmentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  async create(@Body() entity): Promise<number> {
    return this.investmentService.create(entity);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateInvestmentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  async update(@Param('id') id: number, @Body() entity: any) {
    return this.investmentService.update({
      ...entity,
      id: +id,
    });
  }
}
