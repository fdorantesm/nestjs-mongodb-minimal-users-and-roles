import { Logger, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { Context } from '@/core/domain/interfaces/context.interface';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { FindUserQuery } from '@/modules/users/domain/queries';
import { UseCase } from '@/core/application/case.decorator';
import type { Executable } from '@/core/domain/executable.interface';

@UseCase()
export class MeUseCase implements Executable {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(ctx: Context, userId: string): Promise<User> {
    Logger.log('MeUseCase.execute', ctx.requestId);

    const user = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery({ uuid: userId }),
    );

    if (!user) {
      throw new UnauthorizedException('users.invalid_credentials');
    }

    return user.toObject();
  }
}
