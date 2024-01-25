import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  // Assuming you want to include the parent's id in the request
  @ApiProperty()
  @IsOptional()
  readonly parentId?: number;
}
