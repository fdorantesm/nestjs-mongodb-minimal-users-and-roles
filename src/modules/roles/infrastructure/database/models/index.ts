import { RoleModel } from '@/modules/roles/infrastructure/database/models/role.model';
import { RoleSchema } from '@/modules/roles/infrastructure/database/models/role.schema';

export const RoleModelConfig = {
  name: RoleModel.name,
  schema: RoleSchema,
};
