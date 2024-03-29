import { AddRoleCommandHandler } from '@/modules/users/domain/commands/add-role/add-role.command.handler';
import { CreateProfileCommandHandler } from '@/modules/users/domain/commands/register/create-profile.command.handler';
import { RegisterCommandHandler } from '@/modules/users/domain/commands/register/register.command.handler';

export const CommandHandlers = [
  RegisterCommandHandler,
  AddRoleCommandHandler,
  CreateProfileCommandHandler,
];
