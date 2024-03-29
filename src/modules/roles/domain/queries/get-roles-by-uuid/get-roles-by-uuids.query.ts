import { IQuery } from '@nestjs/cqrs';

export class GetRolesByUuidsQuery implements IQuery {
  constructor(public readonly uuids: string[]) {}
}
