import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { UserCreatedEvent } from '@/modules/users/domain/events/user-created/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
  public async handle(event: UserCreatedEvent) {
    const user = event.user;
    Logger.log(`${user.getEmail()} created`, UserCreatedEvent.name);
  }
}
