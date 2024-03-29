import { RegisterRequestDto } from '@/modules/auth/infrastructure/http/dtos/register-request.dto';

export const registers: RegisterRequestDto[] = [
  {
    email: 'sudo@example.com',
    password: 'secret',
    username: 'sudo',
    profile: {
      name: 'Sudo',
      surname: 'Su',
      displayName: 'Sudo Su',
      avatar: 'https://example.com/avatar.jpg',
    },
  },
  {
    email: 'john@example.com',
    password: 'secret',
    username: 'john',
    profile: {
      name: 'John',
      surname: 'Doe',
      displayName: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
      bio: 'I am a developer',
    },
  },
];
