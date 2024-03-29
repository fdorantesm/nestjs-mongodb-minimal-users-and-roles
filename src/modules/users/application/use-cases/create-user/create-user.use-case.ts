import { ConflictException, Inject, Logger } from '@nestjs/common';

import { Context } from '@/core/domain/interfaces/context.interface';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import type { Executable } from '@/core/domain/executable.interface';
import { UseCase } from '@/core/application/case.decorator';
import type { ProfilePayload } from '@/modules/users/domain/interfaces/profile.interface';

@UseCase()
export class CreateUserUseCase implements Executable {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public async execute(
    ctx: Context,
    payload: { user: Partial<User>; profile: ProfilePayload },
  ): Promise<User> {
    Logger.log(`Creating user with email: ${payload.user.email}`, ctx.requestId);

    const previousUser = await this.usersService.count({ email: payload.user.email });

    if (previousUser) {
      throw new ConflictException('api.users.email_already_exists');
    }

    const registration = {
      user: {
        username: payload.user.username,
        email: payload.user.email,
        password: payload.user.password,
        roles: payload.user.roles,
        isActive: payload.user.isActive || true,
      },
      profile: payload.profile,
    };

    const user = await this.usersService.register(registration.user, registration.profile);

    return user.toObject();
  }
}
