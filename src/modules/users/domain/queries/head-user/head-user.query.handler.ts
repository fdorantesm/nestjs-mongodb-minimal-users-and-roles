import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { HeadUserQuery } from '@/modules/users/domain/queries/head-user/head-user.query';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';

@QueryHandler(HeadUserQuery)
export class HeadUserQueryHandler implements IQueryHandler<HeadUserQuery> {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public async execute(command: HeadUserQuery): Promise<boolean> {
    const count = await this.usersService.count(command.filter);
    return Boolean(count);
  }
}
