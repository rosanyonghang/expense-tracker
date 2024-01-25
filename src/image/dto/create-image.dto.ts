import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  // Assuming you want to include the parent's id in the request
  @ApiProperty()
  @IsString()
  readonly filename: string;
}

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
