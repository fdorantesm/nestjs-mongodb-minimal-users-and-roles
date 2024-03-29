import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RolesService } from '@/modules/roles/infrastructure/database/services/roles.service';
import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { ROLES_SERVICE_TOKEN } from '@/modules/roles/domain/interfaces/roles-service.interface';
import { GetRolesByUuidsQuery } from '@/modules/roles/domain/queries/get-roles-by-uuid/get-roles-by-uuids.query';
import { InjectService } from '@/core/application/inject-service.decorator';

@QueryHandler(GetRolesByUuidsQuery)
export class GetRolesByUuidQueryHandler implements IQueryHandler<GetRolesByUuidsQuery> {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
  ) {}
  public async execute(query: GetRolesByUuidsQuery): Promise<RoleEntity[]> {
    return this.rolesService.findManyByUuids(query.uuids);
  }
}
