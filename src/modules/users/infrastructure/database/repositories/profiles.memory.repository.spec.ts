import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import { ProfilesMemoryRepository } from '@/modules/users/infrastructure/database/repositories/profiles.memory.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProfilesMemoryRepository', () => {
  let repository: ProfilesMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesMemoryRepository],
    }).compile();

    repository = module.get<ProfilesMemoryRepository>(ProfilesMemoryRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a profile', async () => {
    const profile: Profile = {
      uuid: '0b6c625d-65a4-4d2c-b2d8-5253a9cce54f',
      name: 'Test',
      surname: 'Test',
      displayName: 'test',
      avatar: 'test',
      bio: 'test',
      userId: '220b34dd-cf8d-4a3f-8342-37b04cfce7de',
    };

    const createdProfile = await repository.create(profile);

    expect(createdProfile).toBeDefined();

    expect(createdProfile.getName()).toEqual(profile.name);
    expect(createdProfile.getSurname()).toEqual(profile.surname);
  });

  it('should update a profile', async () => {
    const profile: Profile = {
      uuid: '0b6c625d-65a4-4d2c-b2d8-5253a9cce54f',
      name: 'Test',
      surname: 'Test',
      displayName: 'test',
      avatar: 'test',
      bio: 'test',
      userId: '220b34dd-cf8d-4a3f-8342-37b04cfce7de',
    };

    const createdProfile = await repository.create(profile);

    const updatedProfile = await repository.update(
      { uuid: createdProfile.getUuid() },
      {
        name: 'Test2',
        surname: 'Test2',
      },
    );

    expect(updatedProfile).toBeDefined();
    expect(updatedProfile.getName()).toEqual('Test2');
    expect(updatedProfile.getSurname()).toEqual('Test2');
  });

  it('should find a profile by uuid', async () => {
    const profile: Profile = {
      uuid: '0b6c625d-65a4-4d2c-b2d8-5253a9cce54f',
      name: 'Test',
      surname: 'Test',
      displayName: 'test',
      avatar: 'test',
      bio: 'test',
      userId: '220b34dd-cf8d-4a3f-8342-37b04cfce7de',
    };

    await repository.create(profile);
    const foundProfile = await repository.findOne({ uuid: profile.uuid });

    expect(foundProfile).toBeDefined();
    expect(foundProfile.getUuid()).toEqual(profile.uuid);
    expect(foundProfile.getName()).toEqual(profile.name);
  });

  it('should delete a profile', async () => {
    const profile: Profile = {
      uuid: '0b6c625d-65a4-4d2c-b2d8-5253a9cce54f',
      name: 'Test',
      surname: 'Test',
      displayName: 'test',
      avatar: 'test',
      bio: 'test',
      userId: '220b34dd-cf8d-4a3f-8342-37b04cfce7de',
    };

    await repository.create(profile);
    await repository.delete({ uuid: profile.uuid });
    const foundProfile = await repository.findOne({ uuid: profile.uuid });

    expect(foundProfile).toBeUndefined();
  });
});
