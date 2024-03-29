import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@/core/application/inject-repository.decorator';
import { BaseService } from '@/core/infrastructure/services/base.service';
import { PROFILES_REPOSITORY } from '@/modules/users/domain/contracts/profiles.repository.contract';
import type { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import type { ProfilesDatabaseRepository } from '@/modules/users/infrastructure/database/repositories/profiles.database.repository';

@Injectable()
export class ProfilesService extends BaseService<Profile, ProfileEntity> {
  constructor(
    @InjectRepository(PROFILES_REPOSITORY)
    private readonly profilesRepository: ProfilesDatabaseRepository,
  ) {
    super(profilesRepository);
  }
}
