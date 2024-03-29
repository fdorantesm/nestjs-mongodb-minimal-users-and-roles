import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from '@/modules/users/domain/commands/register/register.command';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { UserCreatedEvent } from '@/modules/users/domain/events/user-created/user-created.event';
import { InjectService } from '@/core/application/inject-service.decorator';
import {
  PROFILES_SERVICE,
  type ProfilesService,
} from '@/modules/users/domain/contracts/profiles.service.contract';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler {
  constructor(
    private readonly eventBus: EventBus,
    @InjectService(USERS_SERVICE)
    private readonly usersService: UsersService,
    @InjectService(PROFILES_SERVICE)
    private readonly profilesService: ProfilesService,
  ) {}

  public async execute(command: RegisterCommand): Promise<UserEntity> {
    const user = await this.usersService.register(command.user);
    const profile = await this.profilesService.create(command.profile);

    user.setProfile(profile);

    this.eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
