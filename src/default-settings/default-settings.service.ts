import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { DefaultSetting } from './entities/default-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DefaultSettingsService extends BaseService<DefaultSetting> {
  constructor(
    @InjectRepository(DefaultSetting)
    private readonly defaultSettingRepository: Repository<DefaultSetting>,
  ) {
    super(defaultSettingRepository);
  }

  async getHeroDetails() {
    return this.defaultSettingRepository.find({
      where: [{ code: 'HERO_TITLE' }, { code: 'HERO_SUB_TITLE' }],
    });
  }
}
