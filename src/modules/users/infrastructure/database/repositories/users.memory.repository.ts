import DataStore = require('nedb-promises');
import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@/core/infrastructure/repositories/base.memory-repository';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { User } from '@/modules/users/domain/interfaces/user.interface';

@Injectable()
export class UsersMemoryRepository extends BaseMemoryRepository<User, UserEntity> {
  constructor() {
    super(DataStore.create(), UserEntity, { softDelete: true });
  }

  public async getLoginData(email: string): Promise<UserEntity> {
    const user = await this.store.findOne({ email }, { uuid: 1, roles: 1, isActive: 1 });
    if (user) {
      return UserEntity.create(user);
    }
    return undefined;
  }

  public async getCryptedPassword(email: string): Promise<string | undefined> {
    const user = await this.store.findOne({ email }, { password: 1 });
    if (user) {
      return user.password;
    }
    return undefined;
  }
}
