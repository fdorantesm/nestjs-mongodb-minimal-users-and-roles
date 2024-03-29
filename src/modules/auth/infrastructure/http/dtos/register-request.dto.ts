import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

import { registers } from '#/mocks/register.mock';
import { ProfileDto } from '@/modules/auth/infrastructure/http/dtos/profile.dto';

export class RegisterRequestDto {
  @ApiProperty({ example: registers[1].email })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: registers[1].email })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,24}$/)
  public readonly username: string;

  @ApiProperty({ example: registers[1].password })
  @IsString()
  @IsOptional()
  public readonly password: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  public readonly isRecruiter?: boolean;

  @ApiPropertyOptional({})
  @IsObject()
  @Type(() => ProfileDto)
  @ValidateNested()
  @IsOptional()
  public readonly profile?: ProfileDto;
}
