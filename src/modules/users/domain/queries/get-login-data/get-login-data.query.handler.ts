import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetLoginDataQuery } from '@/modules/users/domain/queries/get-login-data/get-login-data.query';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';

@QueryHandler(GetLoginDataQuery)
export class GetLoginDataQueryHandler implements IQueryHandler<GetLoginDataQuery> {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}

  public execute(user: GetLoginDataQuery): Promise<UserEntity> {
    return this.usersService.getLoginData(user.email);
  }
}
