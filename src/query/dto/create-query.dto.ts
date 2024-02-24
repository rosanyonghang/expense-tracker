import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateQueryDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;
}
