import { UserCreatedEventHandler } from '@/modules/users/domain/events/user-created/user-created.event.handler';

export * from '@/modules/users/domain/events/user-created/user-created.event';

export const EventHandlers = [UserCreatedEventHandler];
