import { Module } from '@nestjs/common';
import { DefaultSettingsService } from './default-settings.service';
import { DefaultSettingsController } from './default-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultSetting } from './entities/default-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DefaultSetting])],
  controllers: [DefaultSettingsController],
  providers: [DefaultSettingsService],
})
export class DefaultSettingsModule {}
