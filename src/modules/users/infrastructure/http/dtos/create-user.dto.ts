import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsObject,
  ValidateNested,
  IsBoolean,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ProfileDto } from '@/modules/users/infrastructure/http/dtos/profile.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'louis@example.com' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'louis.b' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,24}$/)
  public username: string;

  @ApiProperty({ example: 'hkQjS0q((?aSc' })
  @IsString()
  @IsOptional()
  public password?: string;

  @ApiProperty({
    type: ProfileDto,
  })
  @IsObject()
  @Type(() => ProfileDto)
  @ValidateNested({ each: true })
  public profile: ProfileDto;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;
}
