import { CreateRoleUseCase } from '@/modules/roles/application/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from '@/modules/roles/application/use-cases/delete-role.use-case';
import { ListRolesUseCase } from '@/modules/roles/application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '@/modules/roles/application/use-cases/update-role.use-case';

export const UseCases = [
  CreateRoleUseCase,
  UpdateRoleUseCase,
  ListRolesUseCase,
  DeleteRoleUseCase,
];
