import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { UserDetail } from './entities/user-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserDetailService extends BaseService<UserDetail> {
  constructor(
    @InjectRepository(UserDetail)
    private readonly accountRepository: Repository<UserDetail>,
  ) {
    super(accountRepository);
  }
}
