import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';
import { RolesRepository } from '@/modules/roles/domain/interfaces/roles-repository.interface';
import { RoleModel } from '@/modules/roles/infrastructure/database/models/role.model';

@Injectable()
export class RolesDatabaseRepository implements RolesRepository {
  constructor(@InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>) {}

  public async find(): Promise<RoleEntity[]> {
    const roles = await this.roleModel.find().exec();
    return roles.map((role) => RoleEntity.create(role.toJSON()));
  }

  public async findOne(filter: Partial<Role>): Promise<RoleEntity> {
    const role = await this.roleModel.findOne(filter).exec();
    if (role) {
      return RoleEntity.create(role.toJSON());
    }
  }

  public async findById(uuid: string): Promise<RoleEntity> {
    const user = await this.findOne({ uuid });
    if (user) {
      return user;
    }
  }

  public async findManyByUuids(uuids: string[]): Promise<RoleEntity[]> {
    const roles = await this.roleModel
      .find({
        uuid: {
          $in: uuids,
        },
      })
      .exec();

    return roles.map((role) => RoleEntity.create(role.toJSON()));
  }

  public async create(role: Role): Promise<RoleEntity> {
    const createdRole = await this.roleModel.create(role);
    if (createdRole) {
      return RoleEntity.create(createdRole.toJSON());
    }
  }

  public async createMany(roles: Role[]): Promise<RoleEntity[]> {
    const createdRoles = await this.roleModel.insertMany(roles);
    return createdRoles.map((role) => RoleEntity.create(role.toJSON()));
  }

  public async update(filter: Partial<Role>, payload: Partial<Role>): Promise<RoleEntity> {
    const role = await this.roleModel.updateOne(filter, payload);
    if (role.modifiedCount === 1) {
      return this.findOne(filter);
    }

    return undefined;
  }
}
