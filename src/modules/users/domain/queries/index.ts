import { CheckUserPasswordQueryHandler } from '@/modules/users/domain/queries/check-user-password/check-user-password.query.handler';
import { FindUserQueryHandler } from '@/modules/users/domain/queries/find-user/find-user.query.handler';
import { FindUsersQueryHandler } from '@/modules/users/domain/queries/find-users/find-users.query.handler';
import { GetLoginDataQueryHandler } from '@/modules/users/domain/queries/get-login-data/get-login-data.query.handler';
import { HeadUserQueryHandler } from '@/modules/users/domain/queries/head-user/head-user.query.handler';

export * from '@/modules/users/domain/queries/check-user-password/check-user-password.query';
export * from '@/modules/users/domain/queries/find-user/find-user.query';
export * from '@/modules/users/domain/queries/find-users/find-users.query';
export * from '@/modules/users/domain/queries/get-login-data/get-login-data.query';
export * from '@/modules/users/domain/queries/head-user/head-user.query';

export const QueryHandlers = [
  CheckUserPasswordQueryHandler,
  FindUserQueryHandler,
  GetLoginDataQueryHandler,
  HeadUserQueryHandler,
  FindUsersQueryHandler,
];
