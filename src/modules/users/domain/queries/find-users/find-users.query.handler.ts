import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { FindUsersQuery } from '@/modules/users/domain/queries/find-users/find-users.query';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<FindUsersQuery> {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public execute(query: FindUsersQuery): Promise<UserEntity[]> {
    return this.usersService.find(query.filter);
  }
}
