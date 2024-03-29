import { IQuery } from '@nestjs/cqrs';

import { UserEntity } from '@/modules/users/domain/entities/user.entity';

export class FindUsersQuery implements IQuery {
  constructor(public filter?: Partial<UserEntity>) {}
}
