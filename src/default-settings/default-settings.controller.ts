import { Controller, UseGuards } from '@nestjs/common';
import { DefaultSettingsService } from './default-settings.service';
import { BaseController } from '../base/base.controller';
import { DefaultSetting } from './entities/default-setting.entity';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../authentication/http/token.guard';

@Controller('default-settings')
@ApiTags('Default Settings')
@UseGuards(TokenGuard)
export class DefaultSettingsController extends BaseController<DefaultSetting> {
  constructor(private readonly defaultSettingService: DefaultSettingsService) {
    super(defaultSettingService);
  }
}
