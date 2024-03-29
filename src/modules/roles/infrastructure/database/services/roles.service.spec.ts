import { Test, TestingModule } from '@nestjs/testing';

import { ROLES_SERVICE_TOKEN } from '@/modules/roles/domain/interfaces/roles-service.interface';
import { ROLES_REPOSITORY_TOKEN } from '@/modules/roles/domain/interfaces/roles-repository.interface';
import { RolesMemoryRepository } from '@/modules/roles/infrastructure/database/repositories/roles.memory.repository';
import { RolesService } from '@/modules/roles/infrastructure/database/services/roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ROLES_SERVICE_TOKEN,
          useClass: RolesService,
        },
        {
          provide: ROLES_REPOSITORY_TOKEN,
          useClass: RolesMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(ROLES_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
