import { Logger, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { Context } from '@/core/domain/interfaces/context.interface';
import { TokenService } from '@/modules/auth/application/services/token.service';
import { TokenPayload } from '@/modules/auth/domain/interfaces/token-payload.interface';
import { Token } from '@/modules/auth/domain/interfaces/token.interface';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { CheckUserPasswordQuery, GetLoginDataQuery } from '@/modules/users/domain/queries';
import type { Executable } from '@/core/domain/executable.interface';
import { UseCase } from '@/core/application/case.decorator';

@UseCase()
export class LoginUseCase implements Executable {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(ctx: Context, email: string, password: string): Promise<Token> {
    Logger.log('LoginUseCase.execute', ctx.requestId);

    const formatedEmail = email.toLowerCase();

    const hasValidCredentials = await this.queryBus.execute<CheckUserPasswordQuery, boolean>(
      new CheckUserPasswordQuery(formatedEmail, password),
    );

    if (!hasValidCredentials) {
      throw this.throwInvalidCredentials();
    }

    const user = await this.queryBus.execute<GetLoginDataQuery, UserEntity>(
      new GetLoginDataQuery(formatedEmail),
    );

    if (!user.isActive) {
      throw this.throwInvalidCredentials();
    }

    const tokenPayload: TokenPayload = {
      uuid: user.uuid,
      roles: user.getRoles(),
    };

    const token = await this.tokenService.create(tokenPayload);

    return token;
  }

  private throwInvalidCredentials() {
    return new UnauthorizedException('users.invalid_credentials');
  }
}
