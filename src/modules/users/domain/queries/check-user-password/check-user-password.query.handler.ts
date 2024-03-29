import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CheckUserPasswordQuery } from '@/modules/users/domain/queries/check-user-password/check-user-password.query';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';

@QueryHandler(CheckUserPasswordQuery)
export class CheckUserPasswordQueryHandler implements IQueryHandler {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  public execute(query: CheckUserPasswordQuery): Promise<boolean> {
    const { email, password } = query;
    return this.usersService.checkPassword(email, password);
  }
}
