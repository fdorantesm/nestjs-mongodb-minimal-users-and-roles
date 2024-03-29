import { UuidService } from 'nestjs-uuid';

import { Context } from '@/core/domain/interfaces/context.interface';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import {
  ROLES_SERVICE_TOKEN,
  RolesService,
} from '@/modules/roles/domain/interfaces/roles-service.interface';
import {
  SLUG_SERVICE_TOKEN,
  SlugService,
} from '@/modules/shared/domain/contracts/slug.service.contract';
import type { Executable } from '@/core/domain/executable.interface';
import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';

@UseCase()
export class CreateRoleUseCase implements Executable {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
    @InjectService(SLUG_SERVICE_TOKEN) private readonly slugService: SlugService,
    private readonly idGeneratorService: UuidService,
  ) {}

  public async execute(ctx: Context, payload: Partial<Role>): Promise<Role> {
    const uuid = this.idGeneratorService.generate();
    const code = this.slugService.execute(payload.name);
    const role = await this.rolesService.create({
      uuid,
      code,
      name: payload.name,
      description: payload.description || payload.name,
      isActive: true,
    });
    return role.toObject();
  }
}
