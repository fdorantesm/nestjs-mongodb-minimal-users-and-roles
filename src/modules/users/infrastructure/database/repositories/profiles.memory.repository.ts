import DataStore = require('nedb-promises');
import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@/core/infrastructure/repositories/base.memory-repository';
import { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

@Injectable()
export class ProfilesMemoryRepository extends BaseMemoryRepository<Profile, ProfileEntity> {
  constructor() {
    super(DataStore.create(), ProfileEntity);
  }
}
