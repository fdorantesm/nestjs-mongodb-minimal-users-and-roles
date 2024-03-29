import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import { ICommand } from '@nestjs/cqrs';

export class CreateProfileCommand implements ICommand {
  constructor(public readonly profile: Profile) {}
}
