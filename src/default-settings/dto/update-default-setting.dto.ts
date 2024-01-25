import { PartialType } from '@nestjs/swagger';
import { CreateDefaultSettingDto } from './create-default-setting.dto';

export class UpdateDefaultSettingDto extends PartialType(CreateDefaultSettingDto) {}
