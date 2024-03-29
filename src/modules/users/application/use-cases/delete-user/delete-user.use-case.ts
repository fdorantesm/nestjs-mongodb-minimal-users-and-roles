import { Inject, Logger, NotFoundException } from '@nestjs/common';

import { Context } from '@/core/domain/interfaces/context.interface';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { UseCase } from '@/core/application/case.decorator';
import type { Executable } from '@/core/domain/executable.interface';

@UseCase()
export class DeleteUserUseCase implements Executable {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public async execute(ctx: Context, uuid: string): Promise<void> {
    Logger.log(`Deleting user with id: ${uuid}`, ctx.requestId);

    const userExists = await this.usersService.count({ uuid });

    if (!userExists) {
      throw new NotFoundException('api.users.not_found');
    }

    await this.usersService.delete({ uuid });
  }
}
