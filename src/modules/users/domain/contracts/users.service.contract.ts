import { Crud } from '@/core/domain/crud.interface';
import { UsersRepository } from '@/modules/users/domain/contracts/users.repository.contract';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import { User } from '@/modules/users/domain/interfaces/user.interface';

export const USERS_SERVICE = 'UsersService';

export interface UsersService extends UsersRepository, Crud<User, UserEntity> {
  checkPassword(email: string, password: string): Promise<boolean>;
  register(
    payload: Omit<User, 'uuid' | 'createdAt' | 'updatedAt'>,
    profile?: Omit<Profile, 'uuid' | 'userId'>,
  ): Promise<UserEntity>;
}
