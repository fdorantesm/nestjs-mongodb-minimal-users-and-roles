import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { registers } from '#/mocks/register.mock';

export class LoginRequestDto {
  @ApiProperty({ example: registers[1].email })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: registers[1].password })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
