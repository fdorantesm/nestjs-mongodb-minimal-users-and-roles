import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  public readonly name: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  public readonly surname: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  public readonly displayName: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  @IsString()
  @IsOptional()
  public readonly avatar?: string;

  @ApiPropertyOptional({ example: 'I am a developer' })
  @IsString()
  @IsOptional()
  public readonly bio?: string;
}
