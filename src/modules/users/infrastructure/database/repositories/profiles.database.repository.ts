import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginateModel } from 'mongoose';

import { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import { ProfileModel } from '@/modules/users/infrastructure/database/models/profile.model';
import { BaseRepository } from '@/core/infrastructure/repositories/base.repository';

@Injectable()
export class ProfilesDatabaseRepository extends BaseRepository<Profile, ProfileEntity> {
  constructor(
    @InjectModel(ProfileModel.name)
    private readonly userModel: PaginateModel<ProfileModel>,
  ) {
    super(userModel, ProfileEntity);
  }
}
