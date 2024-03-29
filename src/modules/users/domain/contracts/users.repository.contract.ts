import { Crud } from '@/core/domain/crud.interface';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import { User } from '@/modules/users/domain/interfaces/user.interface';

export const USER_REPOSITORY = 'UserRepository';

export interface UsersRepository extends Crud<User, UserEntity> {
  getLoginData(email: string): Promise<UserEntity | undefined>;
  getCryptedPassword(email: string): Promise<string | undefined>;
  updateProfile(userId: string, profile: Partial<Profile>): Promise<Profile>;
}
