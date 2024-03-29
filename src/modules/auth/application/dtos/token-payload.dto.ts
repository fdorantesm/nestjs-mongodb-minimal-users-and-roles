import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class TokenPayloadDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12' })
  @IsString()
  @IsUUID()
  public uuid: string;

  @ApiProperty()
  @IsUUID()
  @IsArray()
  @ValidateNested({ each: true })
  public roles: string[];

  @IsNumber()
  @IsOptional()
  public iat?: number;

  @IsNumber()
  @IsOptional()
  public exp?: number;
}
