import { IQuery } from '@nestjs/cqrs';

export class GetRoleByCodeQuery implements IQuery {
  constructor(public readonly code: string) {}
}
