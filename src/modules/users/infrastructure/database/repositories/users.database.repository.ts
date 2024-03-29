import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import { BaseRepository } from '@/core/infrastructure/repositories/base.repository';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { UserModel } from '@/modules/users/infrastructure/database/models/user.model';

@Injectable()
export class UserDatabaseRepository extends BaseRepository<User, UserEntity> {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: PaginateModel<UserModel>,
  ) {
    super(userModel, UserEntity);
  }

  public async find(filter: Partial<User>): Promise<UserEntity[]> {
    const users = await this.userModel
      .find(
        {
          ...filter,
        },
        null,
        { skip: 1 },
      )
      .select('-password')
      .exec();
    return users.map((user) => UserEntity.create(user.toJSON()));
  }

  public async findOne(filter: Partial<User>): Promise<UserEntity> {
    const user = await this.userModel.findOne(filter).select('-password').exec();
    if (user) {
      return UserEntity.create(user.toJSON());
    }

    return undefined;
  }

  public async getLoginData(email: string): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email })
      .select({ uuid: 1, roles: 1, isActive: 1 })
      .exec();
    if (user) {
      return UserEntity.create(user.toJSON());
    }

    return undefined;
  }

  public async getCryptedPassword(email: string): Promise<string | undefined> {
    const user = await this.userModel.findOne({ email }).select({ password: 1 }).exec();
    if (user) {
      return user.password;
    }

    return undefined;
  }
}
