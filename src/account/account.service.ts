import { BadGatewayException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(accountRepository);
  }

  async delete(id: number) {
    try {
      await this.accountRepository.softDelete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getMyData(userId: number) {
    return this.accountRepository
      .createQueryBuilder('account')
      .where('account.createdBy = :id', { id: userId })
      .getMany();
  }
}
