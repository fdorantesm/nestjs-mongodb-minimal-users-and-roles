import { CommandHandler } from '@nestjs/cqrs';

import { CreateProfileCommand } from '@/modules/users/domain/commands/register/create-profile.command';
import {
  PROFILES_SERVICE,
  type ProfilesService,
} from '@/modules/users/domain/contracts/profiles.service.contract';
import { InjectService } from '@/core/application/inject-service.decorator';
import { Logger } from '@nestjs/common';
import type { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler {
  constructor(
    @InjectService(PROFILES_SERVICE)
    private readonly profilesService: ProfilesService,
  ) {}

  public async execute(command: CreateProfileCommand): Promise<ProfileEntity> {
    Logger.log('CreateProfileCommandHandler.execute', 'context.requestId');
    return this.profilesService.create(command.profile);
  }
}
