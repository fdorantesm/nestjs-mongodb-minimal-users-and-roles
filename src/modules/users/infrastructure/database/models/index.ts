import {
  ProfileModel,
  ProfileSchema,
} from '@/modules/users/infrastructure/database/models/profile.model';
import {
  UserModel,
  UserSchema,
} from '@/modules/users/infrastructure/database/models/user.model';

export const UserModelInstance = {
  name: UserModel.name,
  schema: UserSchema,
};

export const ProfileModelInstance = {
  name: ProfileModel.name,
  schema: ProfileSchema,
};
