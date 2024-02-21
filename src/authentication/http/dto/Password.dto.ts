import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
