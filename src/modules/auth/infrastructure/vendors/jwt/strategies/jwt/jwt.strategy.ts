import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayloadDto } from '@/modules/auth/application/dtos/token-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements AbstractStrategy {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  public validate(payload: TokenPayloadDto): TokenPayloadDto {
    try {
      return payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
