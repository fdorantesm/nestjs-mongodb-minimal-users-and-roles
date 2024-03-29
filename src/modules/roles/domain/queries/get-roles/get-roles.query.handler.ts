import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetRolesQuery } from '@/modules/roles/domain/queries/get-roles/get-roles.query';
import {
  ROLES_SERVICE_TOKEN,
  RolesService,
} from '@/modules/roles/domain/interfaces/roles-service.interface';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import { InjectService } from '@/core/application/inject-service.decorator';

@QueryHandler(GetRolesQuery)
export class GetRolesQueryHandler implements IQueryHandler<GetRolesQuery> {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
  ) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesService.find();
    return roles.map((role) => role.toObject());
  }
}
