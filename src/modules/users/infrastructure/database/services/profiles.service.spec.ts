import { Test, type TestingModule } from '@nestjs/testing';

import { PROFILES_REPOSITORY } from '@/modules/users/domain/contracts/profiles.repository.contract';
import { ProfilesMemoryRepository } from '@/modules/users/infrastructure/database/repositories/profiles.memory.repository';
import { ProfilesService } from '@/modules/users/infrastructure/database/services/profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: PROFILES_REPOSITORY,
          useClass: ProfilesMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
