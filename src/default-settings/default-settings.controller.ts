import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { DefaultSettingsService } from './default-settings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateCategoryDto } from '../category/dto/update-category.dto';
import { DefaultSetting } from './entities/default-setting.entity';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../utils/enums/user.enum';
import { RolesGuard } from '../authentication/http/guards/roles.guard';

@Controller('default-settings')
@ApiTags('Default Settings')
export class DefaultSettingsController {
  constructor(private readonly defaultSettingService: DefaultSettingsService) {}

  @Put('/default-settings-update-all')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(TokenGuard, RolesGuard)
  async updateAllDefaultSettings(
    @Body() defaultSettings: UpdateCategoryDto[],
  ): Promise<void> {
    for (const defaultSetting of defaultSettings) {
      await this.defaultSettingService.update({
        id: defaultSetting?.id,
        ...defaultSetting,
      });
    }
  }

  @Get('/hero')
  async getHeroDetails() {
    const res: DefaultSetting[] =
      await this.defaultSettingService.getHeroDetails();
    const result = {};
    for (const item of res) {
      result[item.code] = item.value;
    }
    return result;
  }
}
