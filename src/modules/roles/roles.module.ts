import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UuidModule } from 'nestjs-uuid';

import { RoleModelConfig } from '@/modules/roles/infrastructure/database/models';
import { SharedModule } from '@/modules/shared/shared.module';
import { UseCases } from '@/modules/roles/application/use-cases';
import { QueryHandlers } from '@/modules/roles/domain/queries';
import { ROLES_REPOSITORY_TOKEN } from '@/modules/roles/domain/interfaces/roles-repository.interface';
import { RolesDatabaseRepository } from '@/modules/roles/infrastructure/database/repositories/roles.database.repository';
import { ROLES_SERVICE_TOKEN } from '@/modules/roles/domain/interfaces/roles-service.interface';
import { RolesService } from '@/modules/roles/infrastructure/database/services/roles.service';
import { RolesController } from '@/modules/roles/infrastructure/http/controllers/roles.controller';

@Module({
  imports: [MongooseModule.forFeature([RoleModelConfig]), UuidModule, SharedModule, CqrsModule],
  providers: [
    ...UseCases,
    ...QueryHandlers,
    {
      provide: ROLES_REPOSITORY_TOKEN,
      useClass: RolesDatabaseRepository,
    },
    {
      provide: ROLES_SERVICE_TOKEN,
      useClass: RolesService,
    },
  ],
  controllers: [RolesController],
})
export class RolesModule {}
