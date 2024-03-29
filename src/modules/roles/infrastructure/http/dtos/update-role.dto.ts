import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  public readonly name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly description?: string;
}
