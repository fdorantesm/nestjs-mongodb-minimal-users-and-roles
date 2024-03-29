import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UuidModule } from 'nestjs-uuid';

import {
  ProfileModelInstance,
  UserModelInstance,
} from '@/modules/users/infrastructure/database/models';
import { UseCases } from '@/modules/users/application/use-cases';
import { QueryHandlers } from '@/modules/users/domain/queries';
import { CommandHandlers } from '@/modules/users/domain/commands';
import { EventHandlers } from '@/modules/users/domain/events';
import { USER_REPOSITORY } from '@/modules/users/domain/contracts/users.repository.contract';
import { UserDatabaseRepository } from '@/modules/users/infrastructure/database/repositories/users.database.repository';
import { USERS_SERVICE } from '@/modules/users/domain/contracts/users.service.contract';
import { PASSWORD_SERVICE } from '@/modules/users/domain/contracts/password.service.contract';
import { BcryptService } from '@/modules/users/infrastructure/vendors/services/bcrypt.service';
import { UsersController } from '@/modules/users/infrastructure/http/controllers/users.controller';
import { UsersService } from '@/modules/users/infrastructure/database/services/users.service';
import { PROFILES_SERVICE } from '@/modules/users/domain/contracts/profiles.service.contract';
import { ProfilesService } from '@/modules/users/infrastructure/database/services/profiles.service';
import { PROFILES_REPOSITORY } from '@/modules/users/domain/contracts/profiles.repository.contract';
import { ProfilesDatabaseRepository } from '@/modules/users/infrastructure/database/repositories/profiles.database.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([UserModelInstance, ProfileModelInstance]),
    UuidModule,
  ],
  providers: [
    ...UseCases,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    {
      provide: USER_REPOSITORY,
      useClass: UserDatabaseRepository,
    },
    {
      provide: PROFILES_REPOSITORY,
      useClass: ProfilesDatabaseRepository,
    },
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: PROFILES_SERVICE,
      useClass: ProfilesService,
    },
    {
      provide: PASSWORD_SERVICE,
      useClass: BcryptService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
