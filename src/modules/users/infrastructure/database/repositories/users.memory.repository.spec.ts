import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@/modules/users/domain/interfaces/user.interface';
import { UsersMemoryRepository } from '@/modules/users/infrastructure/database/repositories/users.memory.repository';

describe('UsersMemoryRepository', () => {
  let repository: UsersMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMemoryRepository],
    }).compile();

    repository = module.get<UsersMemoryRepository>(UsersMemoryRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    const user: User = {
      uuid: 'b10c4e7a-7d80-4414-89d9-3e7ca8901561',
      email: 'test@example.com',
      username: 'test',
      password: 'password123',
      roles: [],
      isActive: true,
      profileId: 'dd28754b-18e6-4431-9183-ccc5b3b69a7a',
    };

    const createdUser = await repository.create(user);

    expect(createdUser).toBeDefined();
    expect(createdUser.uuid).toEqual(user.uuid);
    expect(createdUser.getEmail()).toEqual(user.email);
  });

  it('should find a user by email', async () => {
    const user: User = {
      uuid: 'b10c4e7a-7d80-4414-89d9-3e7ca8901561',
      email: 'test@example.com',
      username: 'test',
      password: 'password123',
      roles: [],
      isActive: true,
      profileId: 'dd28754b-18e6-4431-9183-ccc5b3b69a7a',
    };

    await repository.create(user);
    const foundUser = await repository.findOne({ email: user.email });
    expect(foundUser).toBeDefined();
    expect(foundUser.uuid).toEqual(user.uuid);
    expect(foundUser.getEmail()).toEqual(user.email);
  });

  it('should delete a user', async () => {
    const user: User = {
      uuid: 'b10c4e7a-7d80-4414-89d9-3e7ca8901561',
      email: 'test@example.com',
      username: 'test',
      password: 'password123',
      roles: [],
      isActive: true,
      profileId: 'dd28754b-18e6-4431-9183-ccc5b3b69a7a',
    };

    await repository.create(user);
    await repository.delete({ uuid: user.uuid });
    const foundUser = await repository.findOne({ uuid: user.uuid });
    expect(foundUser).toBeUndefined();
  });
});
