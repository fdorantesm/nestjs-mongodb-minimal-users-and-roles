import { Injectable, Scope } from '@nestjs/common';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

import { CookieStrategy } from '../cookie/cookie.strategy';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { QueryStringStrategy } from '../query-string/query-string.strategy';

@Injectable({ scope: Scope.REQUEST })
export class UniversalStrategy extends PassportStrategy(Strategy, 'universal') {
  constructor(
    private readonly jwtGuard: JwtStrategy,
    private readonly cookieGuard: CookieStrategy,
    private readonly queryStringGuard: QueryStringStrategy,
  ) {
    super();
  }

  public async validate(request: Request): Promise<any> {
    let guard: AbstractStrategy;
    if (request.headers.authorization) {
      guard = this.jwtGuard;
    } else if (request.cookies && request.cookies['accessToken']) {
      guard = this.cookieGuard;
    } else if (request.query && request.query['accessToken']) {
      guard = this.queryStringGuard;
    } else {
      throw new Error('auth.invalid_credentials');
    }

    guard.validate(request);
  }
}
