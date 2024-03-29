import { Test, TestingModule } from '@nestjs/testing';
import { UuidModule } from 'nestjs-uuid';

import { PASSWORD_SERVICE } from '@/modules/users/domain/contracts/password.service.contract';
import {
  USER_REPOSITORY,
  UsersRepository,
} from '@/modules/users/domain/contracts/users.repository.contract';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { UsersMemoryRepository } from '@/modules/users/infrastructure/database/repositories/users.memory.repository';
import { UsersService } from '@/modules/users/infrastructure/database/services/users.service';
import { BcryptService } from '@/modules/users/infrastructure/vendors/services/bcrypt.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UuidModule],
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY,
          useClass: UsersMemoryRepository,
        },
        {
          provide: PASSWORD_SERVICE,
          useClass: BcryptService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UsersRepository>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find users with a filter', async () => {
    const filter = { email: 'test@example.com' };
    await userRepository.create({
      email: filter.email,
      username: 'test',
      password: '',
      isActive: true,
      uuid: '',
      roles: [],
      isDeleted: false,
    });
    const users = await service.find(filter);
    expect(users.at(0).getEmail()).toBe(filter.email);
  });

  it('should find a user', async () => {
    const filter = { email: 'test@example.com' };
    await service.create({
      email: filter.email,
      username: 'test',
      password: '',
      isActive: true,
      uuid: '',
      roles: [],
      isDeleted: false,
    });
    const user = await service.findOne(filter);
    expect(user).toBeDefined();
    expect(user.getEmail()).toBe(filter.email);
  });

  it('should get a user count', async () => {
    const filter = {};
    await userRepository.create({
      email: 'john@example.com',
      username: 'john',
      password: '',
      isActive: true,
      uuid: '1',
      roles: [],
    });
    await userRepository.create({
      email: 'jane@example.com',
      username: 'jane',
      password: '',
      isActive: true,
      uuid: '2',
      roles: [],
    });
    const users = await service.count(filter);
    expect(users).toBe(2);
  });

  it('should get login data', async () => {
    const email = 'test@example.com';
    const user = await service.register({
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email,
      username: 'test',
      password: 'secret',
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    });
    const login = await service.getLoginData(email);
    const data = login.toJson();
    expect(data.uuid).toBe(user.uuid);
    expect(data.isActive).toBe(user.isActive);
  });

  it('should find a user by uuid', async () => {
    const email = 'test@example.com';
    const user = await service.register({
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email,
      username: 'test',
      password: 'secret',
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    });
    await service.findById(user.uuid);
  });

  it('should pass if password is correct', async () => {
    const email = 'test@example.com';
    const password = 'password';
    await service.register({
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email,
      username: 'test',
      password,
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    });
    const passwordMatch = await service.checkPassword(email, password);
    expect(passwordMatch).toBeTruthy();
  });

  it('should fails if password is wrong', async () => {
    const email = 'test@example.com';
    const password = 'password';
    await service.register({
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email: 'secret',
      username: 'test',
      password,
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    });
    const passwordMatches = await service.checkPassword(email, password);
    expect(passwordMatches).toBeFalsy();
  });

  it('should register a user', async () => {
    const payload: User = {
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email: 'test@example.com',
      username: 'test',
      password: 'secret',
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    };
    const registeredUser = await service.register(payload);
    const user = registeredUser.toJson();
    expect(user.uuid).toBeDefined();
    expect(user.email).toBe(payload.email);
    expect(user.isActive).toBe(payload.isActive);
    expect(user.roles).toEqual(payload.roles);
  });

  it('should update a user', async () => {
    const user = await service.register({
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email: 'test@example.com',
      username: 'test',
      password: 'secret',
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    });
    const data = { isActive: false };
    const updatedUser = await service.update({ email: user.getEmail() }, data);
    const userJson = updatedUser.toJson();
    expect(userJson.isActive).toBeFalsy();
  });

  it('should delete a user', async () => {
    const user = await service.register({
      uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      email: 'test@example.com',
      username: 'test',
      password: 'secret',
      roles: [],
      isActive: true,
      profileId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
      profile: {
        uuid: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad8',
        name: 'Test',
        surname: 'User',
        displayName: 'Test User',
        userId: 'aa33bf02-82ed-4f0a-8cb4-cc6dfa576ad7',
      },
    });
    await service.delete({ email: user.getEmail() });
    const userQuery = await service.findOne({ email: user.getEmail() });
    expect(userQuery).toBeFalsy();
  });
});
