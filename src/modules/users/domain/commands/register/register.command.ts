import { ICommand } from '@nestjs/cqrs';

import { User } from '@/modules/users/domain/interfaces/user.interface';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

export class RegisterCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly profile?: Profile,
  ) {}
}
