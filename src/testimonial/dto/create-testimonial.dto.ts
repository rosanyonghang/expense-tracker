import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  description: string;
}
