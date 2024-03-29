import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import {
  USER_REPOSITORY,
  UsersRepository,
} from '@/modules/users/domain/contracts/users.repository.contract';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '@/modules/users/domain/contracts/password.service.contract';
import { Profile } from '@/modules/users/domain/interfaces/profile.interface';
import { BaseService } from '@/core/infrastructure/services/base.service';
import { Crud } from '@/core/domain/crud.interface';
import { InjectRepository } from '@/core/application/inject-repository.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';

@Injectable()
export class UsersService extends BaseService<User, UserEntity> {
  constructor(
    @InjectRepository(USER_REPOSITORY)
    private readonly userRepository: Crud<User, UserEntity> & UsersRepository,
    @InjectService(PASSWORD_SERVICE)
    private readonly passwordService: PasswordService,
  ) {
    super(userRepository);
  }

  public getLoginData(email: string): Promise<UserEntity> {
    return this.userRepository.getLoginData(email);
  }

  public async checkPassword(email: string, password: string): Promise<boolean> {
    const cryptedPassword = await this.userRepository.getCryptedPassword(email);
    if (cryptedPassword) {
      const passwordMatches = await this.passwordService.match(password, cryptedPassword);

      return passwordMatches;
    }

    return false;
  }

  public async register(payload: User): Promise<UserEntity> {
    const password = await this.passwordService.generate(payload.password, 10);

    return this.userRepository.create({
      ...payload,
      password,
    });
  }

  public updateProfile(userId: string, data: Partial<Profile>): Promise<Profile> {
    return this.userRepository.updateProfile(userId, data);
  }

  public update(filter: Partial<User>, data: Partial<User>): Promise<UserEntity> {
    return this.userRepository.update(filter, data);
  }
}
