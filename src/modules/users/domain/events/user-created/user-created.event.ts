import { IEvent } from '@nestjs/cqrs';

import type { UserEntity } from '@/modules/users/domain/entities/user.entity';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly user: UserEntity) {}
}
