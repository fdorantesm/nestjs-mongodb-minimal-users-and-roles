import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddRoleCommand } from '@/modules/users/domain/commands/add-role/add-role.command';
import {
  USERS_SERVICE,
  UsersService,
} from '@/modules/users/domain/contracts/users.service.contract';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { InjectService } from '@/core/application/inject-service.decorator';

@CommandHandler(AddRoleCommand)
export class AddRoleCommandHandler implements ICommandHandler<AddRoleCommand> {
  constructor(
    @InjectService(USERS_SERVICE)
    private readonly userService: UsersService,
  ) {}

  public async execute(command: AddRoleCommand): Promise<Partial<User>> {
    const filter = { uuid: command.userId };
    const user = await this.userService.findOne(filter);

    user.addRole(command.role);

    await this.userService.update(filter, {
      roles: user.getRoles(),
    });

    return user.toJson();
  }
}
