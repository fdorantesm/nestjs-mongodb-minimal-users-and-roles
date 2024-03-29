import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  @IsString()
  public accessToken: string;

  @ApiProperty({ example: 1612345678901 })
  @IsNumber()
  public expiresAt: number;
}
