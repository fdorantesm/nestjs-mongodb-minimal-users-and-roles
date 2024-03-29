import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';

import type { Executable } from '@/core/domain/executable.interface';
import type { Context } from '@/core/domain/interfaces/context.interface';
import {
  PROFILES_SERVICE,
  ProfilesService,
} from '@/modules/users/domain/contracts/profiles.service.contract';
import { InjectService } from '@/core/application/inject-service.decorator';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

@Injectable()
export class UpdateUserProfileUseCase implements Executable {
  constructor(
    @InjectService(USERS_SERVICE)
    private readonly usersService: UsersService,
    @InjectService(PROFILES_SERVICE)
    private readonly profilesService: ProfilesService,
  ) {}
  public async execute(ctx: Context, userId: string, data: Partial<Profile>): Promise<void> {
    Logger.log(`Updating user profile with id: ${userId}`, ctx.requestId);

    const user = await this.usersService.findOne({ uuid: userId });

    if (!user) {
      throw new NotFoundException('users.not_found');
    }

    await this.profilesService.update({ userId }, data);
  }
}
