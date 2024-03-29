import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';

import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import { GetRolesByUuidsQuery } from '@/modules/roles/domain/queries/get-roles-by-uuid/get-roles-by-uuids.query';
import { Roles } from '@/modules/users/domain/enums/role.enum';
// eslint-disable-next-line hexagonal-architecture/enforce
import { Request } from '@/core/infrastructure/types/http/request.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly queryBus: QueryBus,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.get<string[]>('roles', context.getHandler());

    if (!metadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    const roles = await this.queryBus.execute<GetRolesByUuidsQuery, Role[]>(
      new GetRolesByUuidsQuery(user.roles),
    );

    const isAdmin = roles.some((role: Role) => role.code === Roles.ADMIN);

    if (isAdmin) {
      return true;
    }

    const hasScope = () =>
      roles.some((role) => Boolean(metadata.find((item) => item === role.code)));

    const isAllowed = user && roles && hasScope();

    if (!isAllowed) {
      throw new ForbiddenException('auth.forbidden_action');
    }

    return true;
  }
}
