import { IQuery } from '@nestjs/cqrs';

export class GetRoleByUuidQuery implements IQuery {
  constructor(public readonly uuid: string) {}
}
