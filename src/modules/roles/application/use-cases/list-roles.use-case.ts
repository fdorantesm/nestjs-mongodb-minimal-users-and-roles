import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';
import type { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import {
  ROLES_SERVICE_TOKEN,
  RolesService,
} from '@/modules/roles/domain/interfaces/roles-service.interface';

@UseCase()
export class ListRolesUseCase implements Executable {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
  ) {}

  public async execute(ctx: Context): Promise<Role[]> {
    const roles = await this.rolesService.find();
    return roles.map((role) => role.toObject());
  }
}
