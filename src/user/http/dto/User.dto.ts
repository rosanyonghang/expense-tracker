import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  readonly fullname?: string;

  @ApiProperty()
  @IsString()
  readonly img?: string;

  @ApiProperty()
  @IsString()
  readonly address?: string;

  @ApiProperty()
  @IsString()
  readonly occupation?: string;
}
