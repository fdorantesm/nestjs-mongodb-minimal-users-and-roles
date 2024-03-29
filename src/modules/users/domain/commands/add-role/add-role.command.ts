import { ICommand } from '@nestjs/cqrs';

export class AddRoleCommand implements ICommand {
  constructor(
    public readonly role: string,
    public readonly userId: string,
  ) {}
}
