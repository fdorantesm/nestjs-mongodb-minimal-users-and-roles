import { Injectable } from '@nestjs/common';
import DataStore = require('nedb-promises');

import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import { RolesRepository } from '@/modules/roles/domain/interfaces/roles-repository.interface';

@Injectable()
export class RolesMemoryRepository implements RolesRepository {
  private readonly roles: DataStore<Role>;

  constructor() {
    this.roles = DataStore.create();
  }

  public async find(): Promise<RoleEntity[]> {
    const roles = await this.roles.find({});
    return roles.map((role) => RoleEntity.create(role));
  }

  public async findOne(filter: Partial<Role>): Promise<RoleEntity> {
    const role = await this.roles.findOne(filter);
    if (role) {
      return RoleEntity.create(role);
    }
    return undefined;
  }

  public async findById(uuid: string): Promise<RoleEntity> {
    const role = await this.roles.findOne({ uuid });
    if (role) {
      return RoleEntity.create(role);
    }
    return undefined;
  }

  public async findManyByUuids(uuids: string[]): Promise<RoleEntity[]> {
    const roles = await this.roles.find({ uuid: { $in: uuids } });
    return roles.map((role) => RoleEntity.create(role));
  }

  public async create(role: Role): Promise<RoleEntity> {
    const roleEntity = RoleEntity.create(role);
    await this.roles.insert(roleEntity);
    return roleEntity;
  }

  public async createMany(roles: Role[]): Promise<RoleEntity[]> {
    const roleEntities = roles.map((role) => RoleEntity.create(role));
    await this.roles.insert(roleEntities);
    return roleEntities;
  }

  public async update(filter: Partial<Role>, payload: Partial<Role>): Promise<RoleEntity> {
    const role = await this.roles
      .update(filter, { $set: payload })
      .then(() => this.roles.findOne(filter));
    if (role) {
      return RoleEntity.create(role);
    }
    return undefined;
  }
}
