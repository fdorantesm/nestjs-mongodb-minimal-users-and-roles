import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';

import { TokenService } from '@/modules/auth/application/services/token.service';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { FindUserQuery } from '@/modules/users/domain/queries';

@Injectable()
export class CookieStrategy
  extends PassportStrategy(Strategy, 'cookie')
  implements AbstractStrategy
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService,
  ) {
    super({
      cookieName: 'accessToken',
    });
  }

  public async validate(token: string) {
    if (!token) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    const payload = await this.tokenService.decode(token);

    if (!payload) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    const user = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery({ uuid: payload.uuid }),
    );

    if (!user) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    return payload;
  }
}
