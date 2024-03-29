import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';

export const ROLES_SERVICE_TOKEN = 'RolesService';

export interface RolesService {
  find(): Promise<RoleEntity[]>;
  findOne(filter: Partial<Role>): Promise<RoleEntity>;
  findById(uuid: string): Promise<RoleEntity>;
  findManyByUuids(uuids: string[]): Promise<RoleEntity[]>;
  create(role: Role): Promise<RoleEntity>;
  update(filter: Partial<Role>, payload: Partial<Role>): Promise<RoleEntity>;
}
