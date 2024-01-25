import { Controller, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { BaseController } from '../base/base.controller';
import { Account } from './entities/account.entity';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/authentication/http/token.guard';

@Controller('account')
@ApiTags('Account')
@UseGuards(TokenGuard)
export class AccountController extends BaseController<Account> {
  constructor(private readonly accountService: AccountService) {
    super(accountService);
  }
}
