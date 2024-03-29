import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetRoleByCodeQuery } from '@/modules/roles/domain/queries/get-role-by-code/get-role-by-code.query';
import {
  ROLES_SERVICE_TOKEN,
  RolesService,
} from '@/modules/roles/domain/interfaces/roles-service.interface';
import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { InjectService } from '@/core/application/inject-service.decorator';

@QueryHandler(GetRoleByCodeQuery)
export class GetRoleByCodeQueryHandler implements IQueryHandler<GetRoleByCodeQuery> {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
  ) {}
  public async execute(query: GetRoleByCodeQuery): Promise<RoleEntity> {
    return this.rolesService.findOne({ code: query.code });
  }
}
