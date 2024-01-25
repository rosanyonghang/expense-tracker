import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, UserType } from '../../../utils/enums/user.enum';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly phone: string;

  @IsOptional()
  @ApiProperty({ enum: Role })
  @IsEnum(Role, {
    message: 'Invalid role supplied',
  })
  readonly role: Role;

  @IsOptional()
  @ApiProperty({ enum: UserType })
  @IsEnum(UserType, {
    message: 'Invalid userType supplied',
  })
  readonly userType: Role;

  @IsString()
  @ApiProperty()
  readonly fullname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly img?: string;

  @IsNumber()
  @ApiProperty()
  readonly openingBalance?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly occupation?: string;
}
