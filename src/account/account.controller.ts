import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { BaseController } from '../base/base.controller';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ResponseMessage } from '../core/decorators/response.decorator';

@Controller('account')
@ApiTags('Account')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class AccountController extends BaseController<Account> {
  constructor(private readonly accountService: AccountService) {
    super(accountService);
  }

  @Get('me')
  @ResponseMessage('Records has been successfully retrieved')
  @ApiOperation({
    summary: 'Retrieves user data',
    description: 'Loads all the accounts data of the user',
  })
  async getMyData(@Req() req: any): Promise<Account[]> {
    return this.accountService.getMyData(req.user.id);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateAccountDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  @ResponseMessage('Record has been successfully created')
  async create(@Body() entity, @Req() req: any): Promise<number> {
    return this.accountService.create({
      ...entity,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateAccountDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  @ResponseMessage('Record has been successfully updated')
  async update(
    @Param('id') id: number,
    @Body() entity: Account,
    @Req() req: any,
  ) {
    return this.accountService.update({
      ...entity,
      id: +id,
      updatedBy: req.user.id,
    });
  }
}
