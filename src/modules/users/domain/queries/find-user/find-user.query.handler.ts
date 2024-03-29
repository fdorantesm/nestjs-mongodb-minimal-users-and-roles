import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { FindUserQuery } from '@/modules/users/domain/queries/find-user/find-user.query';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public execute(command: FindUserQuery): Promise<UserEntity> {
    return this.usersService.findOne(command.filter);
  }
}
