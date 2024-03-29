import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetRoleByUuidQuery } from '@/modules/roles/domain/queries/get-role-by-uuid/get-role-by-uuid.query';
import {
  ROLES_SERVICE_TOKEN,
  RolesService,
} from '@/modules/roles/domain/interfaces/roles-service.interface';
import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { InjectService } from '@/core/application/inject-service.decorator';

@QueryHandler(GetRoleByUuidQuery)
export class GetRoleByUuidQueryHandler implements IQueryHandler<GetRoleByUuidQuery> {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
  ) {}
  public async execute(query: GetRoleByUuidQuery): Promise<RoleEntity> {
    return this.rolesService.findOne({ uuid: query.uuid });
  }
}
