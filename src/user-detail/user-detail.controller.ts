import { Controller, UseGuards } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { BaseController } from '../base/base.controller';
import { UserDetail } from './entities/user-detail.entity';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../authentication/http/guards/token.guard';

@Controller('user-detail')
@ApiTags('User')
@UseGuards(TokenGuard)
export class UserDetailController extends BaseController<UserDetail> {
  constructor(private readonly userDetailService: UserDetailService) {
    super(userDetailService);
  }
}
