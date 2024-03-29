import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

import { Roles } from '@/modules/users/domain/enums/role.enum';

export class CreateRoleDto {
  @ApiProperty({ example: 'Administrator' })
  @IsString()
  @IsIn(Object.values(Roles))
  public readonly name: string;

  @ApiPropertyOptional({ example: 'Administrator role' })
  @IsString()
  @IsOptional()
  public readonly description?: string;
}
