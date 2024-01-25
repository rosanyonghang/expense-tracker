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
import { RecurringTransactionService } from './recurring-transaction.service';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { BaseController } from '../base/base.controller';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { ResponseMessage } from '../core/decorators/response.decorator';

@Controller('recurring-transaction')
@ApiTags('RecurringTransaction')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class RecurringTransactionController extends BaseController<RecurringTransaction> {
  constructor(
    private readonly recurringTransactionService: RecurringTransactionService,
  ) {
    super(recurringTransactionService);
  }

  @Get('me')
  @ResponseMessage('Records has been successfully retrieved')
  @ApiOperation({
    summary: 'Retrieves user data',
    description: 'Loads all the recurring transaction data of the user',
  })
  async getMyData(@Req() req: any): Promise<RecurringTransaction[]> {
    return this.recurringTransactionService.getMyData(req.user.id);
  }
  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateRecurringTransactionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  async create(@Body() entity): Promise<number> {
    return this.recurringTransactionService.create(entity);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateRecurringTransactionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  async update(@Param('id') id: number, @Body() entity: RecurringTransaction) {
    return this.recurringTransactionService.update({
      ...entity,
      id: +id,
    });
  }
}
