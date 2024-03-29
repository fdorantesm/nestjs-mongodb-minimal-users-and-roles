import { TokenPayloadDto } from '@/modules/auth/application/dtos/token-payload.dto';
import { TokenDto } from '@/modules/auth/application/dtos/token.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async create(payload: TokenPayloadDto): Promise<TokenDto> {
    const accessToken = await this.jwtService.sign(payload);
    const signed = await this.jwtService.verify(accessToken);
    return {
      accessToken,
      expiresAt: signed.exp,
    };
  }

  public async decode(token: string): Promise<TokenPayloadDto> {
    return this.jwtService.decode(token) as TokenPayloadDto;
  }
}
