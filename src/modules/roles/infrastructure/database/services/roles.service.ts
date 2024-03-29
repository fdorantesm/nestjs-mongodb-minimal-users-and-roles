import { Injectable, Logger } from '@nestjs/common';

import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import {
  ROLES_REPOSITORY_TOKEN,
  RolesRepository,
} from '@/modules/roles/domain/interfaces/roles-repository.interface';
import { RolesService as IRolesService } from '@/modules/roles/domain/interfaces/roles-service.interface';
import { InjectRepository } from '@/core/application/inject-repository.decorator';

@Injectable()
export class RolesService implements IRolesService {
  constructor(
    @InjectRepository(ROLES_REPOSITORY_TOKEN)
    private readonly rolesRepository: RolesRepository,
  ) {
    this.bootstrap();
  }

  public find(): Promise<RoleEntity[]> {
    return this.rolesRepository.find();
  }

  public findOne(filter: Partial<Role>): Promise<RoleEntity> {
    return this.rolesRepository.findOne(filter);
  }

  public findById(uuid: string): Promise<RoleEntity> {
    return this.findOne({ uuid });
  }

  public findManyByUuids(uuids: string[]): Promise<RoleEntity[]> {
    return this.rolesRepository.findManyByUuids(uuids);
  }

  public create(role: Role): Promise<RoleEntity> {
    return this.rolesRepository.create(role);
  }

  public update(filter: Partial<Role>, payload: Partial<Role>): Promise<RoleEntity> {
    return this.rolesRepository.update(filter, payload);
  }

  private async bootstrap(): Promise<void> {
    Logger.log('Bootstrapping roles');
    const initialRoles = [
      {
        uuid: 'e5c10642-bfad-4690-b7b2-f32b371da091',
        code: 'sudoer',
        name: 'Sudoer',
        description: 'Sudoer role',
        isActive: true,
      },
      {
        uuid: 'e5c10642-bfad-4690-b7b2-f32b371da092',
        code: 'admin',
        name: 'Admin',
        description: 'Admin role',
        isActive: true,
      },
      {
        uuid: 'e5c10642-bfad-4690-b7b2-f32b371da093',
        code: 'recruiter',
        name: 'Recruiter',
        description: 'Recruiter role',
        isActive: true,
      },
      {
        uuid: 'e5c10642-bfad-4690-b7b2-f32b371da094',
        code: 'user',
        name: 'User',
        description: 'User role',
        isActive: true,
      },
    ];

    const existingRoles = await this.rolesRepository.findManyByUuids(
      initialRoles.map((role) => role.uuid),
    );

    for (const role of initialRoles) {
      const roleExists = existingRoles.some((role) => role.code === role.code);

      if (!roleExists) {
        await this.rolesRepository.create(role);
      }
    }

    return undefined;
  }
}
