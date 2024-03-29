import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import {
  ROLES_SERVICE_TOKEN,
  RolesService,
} from '@/modules/roles/domain/interfaces/roles-service.interface';
import type { Executable } from '@/core/domain/executable.interface';
import { InjectService } from '@/core/application/inject-service.decorator';
import type { Context } from '@/core/domain/interfaces/context.interface';

@Injectable()
export class DeleteRoleUseCase implements Executable {
  constructor(
    @InjectService(ROLES_SERVICE_TOKEN) private readonly rolesService: RolesService,
  ) {}

  public async execute(ctx: Context, roleId: string): Promise<any> {
    Logger.log(`Deleting role with id: ${roleId}`, ctx.requestId);

    const role = await this.rolesService.findOne({ uuid: roleId });

    if (!role) {
      throw new NotFoundException('api.roles.not_found');
    }

    return role.toJson();
  }
}
