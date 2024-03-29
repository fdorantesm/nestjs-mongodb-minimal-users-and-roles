import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/core.module';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { HealthModule } from '@/modules/health/health.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { SharedModule } from '@/modules/shared/shared.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
    HealthModule,
    SharedModule,
  ],
})
export class AppModule {}
