import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { BaseController } from '../base/base.controller';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ResponseMessage } from '../core/decorators/response.decorator';

@Controller('transaction')
@ApiTags('Transaction')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class TransactionController extends BaseController<Transaction> {
  constructor(private readonly transactionService: TransactionService) {
    super(transactionService);
  }

  @Get('me')
  @ResponseMessage('Records has been successfully retrieved')
  @ApiOperation({
    summary: 'Retrieves user transactions',
    description: 'Loads all the transactions data of the user',
  })
  async getMyData(@Req() req: any): Promise<Transaction[]> {
    return this.transactionService.getMyData(req.user.id);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateTransactionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  async create(@Body() entity, @Req() req: any): Promise<number> {
    return this.transactionService.create({
      ...entity,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      user: req.user.id,
    });
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateTransactionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() entity: Transaction,
    @Req() req: any,
  ) {
    return this.transactionService.update({
      ...entity,
      id: +id,
      updatedBy: req.user.id,
    });
  }
}
