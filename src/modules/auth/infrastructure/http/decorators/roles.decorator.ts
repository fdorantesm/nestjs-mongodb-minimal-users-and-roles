import { SetMetadata } from '@nestjs/common';

export const WithRoles = function (...roles: string[]) {
  return SetMetadata('roles', roles);
};
