import { User } from '@/modules/users/domain/interfaces/user.interface';
import { IQuery } from '@nestjs/cqrs';

export class HeadUserQuery implements IQuery {
  constructor(public filter?: Partial<User>) {}
}
