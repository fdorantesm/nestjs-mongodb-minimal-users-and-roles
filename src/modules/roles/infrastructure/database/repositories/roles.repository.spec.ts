import { Test, TestingModule } from '@nestjs/testing';

import {
  ROLES_REPOSITORY_TOKEN,
  RolesRepository,
} from '@/modules/roles/domain/interfaces/roles-repository.interface';
import { RolesMemoryRepository } from '@/modules/roles/infrastructure/database/repositories/roles.memory.repository';

describe('RolesRepository', () => {
  let repository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ROLES_REPOSITORY_TOKEN,
          useClass: RolesMemoryRepository,
        },
      ],
    }).compile();

    repository = module.get<RolesRepository>(ROLES_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
