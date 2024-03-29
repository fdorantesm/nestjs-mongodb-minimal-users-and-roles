import { registers } from '#/mocks/register.mock';
import { LoginRequestDto } from '@/modules/auth/infrastructure/http/dtos/login-request.dto';

export const logins: LoginRequestDto[] = [
  {
    email: registers[0].email,
    password: registers[0].password,
  },
  {
    email: registers[1].email,
    password: registers[1].password,
  },
];
