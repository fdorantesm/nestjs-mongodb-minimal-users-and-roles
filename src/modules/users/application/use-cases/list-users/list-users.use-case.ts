import { Inject, Injectable } from '@nestjs/common';

import { USERS_SERVICE } from '@/modules/users/domain/contracts/users.service.contract';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { UsersService } from '@/modules/users/infrastructure/database/services/users.service';
import type { Executable } from '@/core/domain/executable.interface';
import type { Context } from '@/core/domain/interfaces/context.interface';

@Injectable()
export class ListUsersUseCase implements Executable {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}

  public async execute(ctx: Context, filter: Partial<User>) {
    const users = await this.usersService.find(filter);
    return users.map((user) => user.toObject());
  }
}
