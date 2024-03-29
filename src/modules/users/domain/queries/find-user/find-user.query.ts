import { IQuery } from '@nestjs/cqrs';

import { UserEntity } from '@/modules/users/domain/entities/user.entity';

export class FindUserQuery implements IQuery {
  constructor(public filter?: Partial<UserEntity>) {}
}
