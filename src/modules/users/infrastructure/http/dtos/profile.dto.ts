import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ProfileDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(2, 24)
  public readonly name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @Length(2, 24)
  public readonly surname: string;

  @ApiProperty({ example: 'John D' })
  @IsString()
  @Length(2, 24)
  public displayName: string;

  @ApiProperty({ example: 'Full stack JS software engineer based in California' })
  @IsString()
  @Length(32, 256)
  public bio: string;
}
