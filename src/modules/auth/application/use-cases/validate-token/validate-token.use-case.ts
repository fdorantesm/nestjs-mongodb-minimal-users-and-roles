import { UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { Context } from '@/core/domain/interfaces/context.interface';
import { TokenPayload } from '@/modules/auth/domain/interfaces/token-payload.interface';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { FindUserQuery } from '@/modules/users/domain/queries';
import { UseCase } from '@/core/application/case.decorator';
import type { Executable } from '@/core/domain/executable.interface';

@UseCase()
export class ValidateTokenUseCase implements Executable {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(ctx: Context, userId: string): Promise<TokenPayload> {
    const user = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery({ uuid: userId }),
    );

    if (!user) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    return {
      uuid: user.uuid,
      roles: user.getRoles(),
    };
  }
}
