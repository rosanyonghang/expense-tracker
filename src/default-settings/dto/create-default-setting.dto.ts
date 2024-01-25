import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDefaultSettingDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  code: string;
}
