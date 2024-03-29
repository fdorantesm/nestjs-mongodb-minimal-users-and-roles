import { CreateUserUseCase } from '@/modules/users/application/use-cases/create-user/create-user.use-case';
import { DeleteUserUseCase } from '@/modules/users/application/use-cases/delete-user/delete-user.use-case';
import { GetUserUseCase } from '@/modules/users/application/use-cases/get-user/get-user.use-case';
import { ListUsersUseCase } from '@/modules/users/application/use-cases/list-users/list-users.use-case';
import { UpdateUserProfileUseCase } from '@/modules/users/application/use-cases/update-user-profile/update-user-profile.use-case';
import { UpdateUserUseCase } from '@/modules/users/application/use-cases/update-user/update-user.use-case';

export * from '@/modules/users/application/use-cases/create-user/create-user.use-case';
export * from '@/modules/users/application/use-cases/delete-user/delete-user.use-case';
export * from '@/modules/users/application/use-cases/get-user/get-user.use-case';
export * from '@/modules/users/application/use-cases/list-users/list-users.use-case';
export * from '@/modules/users/application/use-cases/update-user-profile/update-user-profile.use-case';
export * from '@/modules/users/application/use-cases/update-user/update-user.use-case';

export const UseCases = [
  ListUsersUseCase,
  UpdateUserProfileUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
];
