import type { Crud } from '@/core/domain/crud.interface';
import type { ProfilesRepository } from '@/modules/users/domain/contracts/profiles.repository.contract';
import type { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

export const PROFILES_SERVICE = 'ProfilesService';

export interface ProfilesService extends ProfilesRepository, Crud<Profile, ProfileEntity> {}
