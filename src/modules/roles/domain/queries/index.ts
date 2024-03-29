import { GetRoleByCodeQueryHandler } from '@/modules/roles/domain/queries/get-role-by-code/get-role-by-code.query.handler';
import { GetRoleByUuidQueryHandler } from '@/modules/roles/domain/queries/get-role-by-uuid/get-role-by-uuid.query.handler';
import { GetRolesByUuidQueryHandler } from '@/modules/roles/domain/queries/get-roles-by-uuid/get-roles-by-uuids.query.handler';
import { GetRolesQueryHandler } from '@/modules/roles/domain/queries/get-roles/get-roles.query.handler';

export * from '@/modules/roles/domain/queries/get-role-by-code/get-role-by-code.query';
export * from '@/modules/roles/domain/queries/get-role-by-uuid/get-role-by-uuid.query';
export * from '@/modules/roles/domain/queries/get-roles-by-uuid/get-roles-by-uuids.query';
export * from '@/modules/roles/domain/queries/get-roles/get-roles.query';

export const QueryHandlers = [
  GetRoleByCodeQueryHandler,
  GetRolesQueryHandler,
  GetRolesByUuidQueryHandler,
  GetRoleByUuidQueryHandler,
];
