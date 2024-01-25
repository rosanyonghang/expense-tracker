import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionService } from '../transaction/transaction.service';
import { TokenGuard } from '../authentication/http/guards/token.guard';

@Controller('summary')
@ApiBearerAuth()
@ApiTags('Summary')
export class SummaryController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get summary data',
    description:
      'Get total expenses, total income, total balance, and max expense category',
  })
  @UseGuards(TokenGuard)
  @ApiResponse({ status: 200, description: 'Return summary data' })
  async getSummary(@Req() request): Promise<any> {
    const userId = request.user.id; // Assuming your JWT token contains user information

    return this.transactionService.getUserSummary(userId);
  }
}
