import { Inject, NotFoundException } from '@nestjs/common';

import { Context } from '@/core/domain/interfaces/context.interface';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '@/modules/users/domain/contracts/password.service.contract';
import { USERS_SERVICE } from '@/modules/users/domain/contracts/users.service.contract';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { UsersService } from '@/modules/users/infrastructure/database/services/users.service';
import type { Executable } from '@/core/domain/executable.interface';
import { UseCase } from '@/core/application/case.decorator';

@UseCase()
export class UpdateUserUseCase implements Executable {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: PasswordService,
  ) {}

  public async execute(ctx: Context, uuid: string, data: Partial<User>): Promise<User> {
    const usersExists = await this.usersService.count({ uuid });

    if (!usersExists) {
      throw new NotFoundException('api.users.not_found');
    }

    if (data.password) {
      data.password = await this.passwordService.generate(data.password, 10);
    }

    const user = await this.usersService.update({ uuid }, data);
    return user.toObject();
  }
}
