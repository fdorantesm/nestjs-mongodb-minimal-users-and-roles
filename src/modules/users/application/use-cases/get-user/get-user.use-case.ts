import { Inject, Logger, NotFoundException } from '@nestjs/common';

import { Context } from '@/core/domain/interfaces/context.interface';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { UseCase } from '@/core/application/case.decorator';
import type { Executable } from '@/core/domain/executable.interface';

@UseCase()
export class GetUserUseCase implements Executable {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public async execute(ctx: Context, uuid: string): Promise<User> {
    Logger.log(`Getting user with id: ${uuid}`, ctx.requestId);

    const userExists = await this.usersService.count({ uuid });

    if (!userExists) {
      throw new NotFoundException('api.users.not_found');
    }

    const user = await this.usersService.findOne({ uuid });

    return user.toObject();
  }
}
