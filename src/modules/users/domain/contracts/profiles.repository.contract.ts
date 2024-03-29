import type { Crud } from '@/core/domain/crud.interface';
import type { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

export const PROFILES_REPOSITORY = 'ProfilesRepository';

export interface ProfilesRepository extends Crud<Profile, ProfileEntity> {}
