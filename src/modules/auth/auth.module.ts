import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UuidModule } from 'nestjs-uuid';

import { CookieGuard } from '@/modules/auth/application/guards/cookie.guard';
import { JwtGuard } from '@/modules/auth/application/guards/jwt.guard';
import { QueryStringGuard } from '@/modules/auth/application/guards/query-string.guard';
import { RolesGuard } from '@/modules/auth/application/guards/role.guard';
import { UniversalAuthGuard } from '@/modules/auth/application/guards/universal.guard';
import { TokenService } from '@/modules/auth/application/services/token.service';
import { useCases } from '@/modules/auth/application/use-cases';
import { tokenConfigLoader } from '@/modules/auth/infrastructure/config/loaders/jwt.config-loader';
import { AuthController } from '@/modules/auth/infrastructure/http/controllers/auth.controller';
import { CookieStrategy } from '@/modules/auth/infrastructure/vendors/jwt/strategies/cookie/cookie.strategy';
import { JwtStrategy } from '@/modules/auth/infrastructure/vendors/jwt/strategies/jwt/jwt.strategy';
import { QueryStringStrategy } from '@/modules/auth/infrastructure/vendors/jwt/strategies/query-string/query-string.strategy';
import { UniversalStrategy } from '@/modules/auth/infrastructure/vendors/jwt/strategies/universal/universal.strategy';
import { SharedModule } from '@/modules/shared/shared.module';
import type { JwtConfiguration } from '@/core/infrastructure/types/jwt/jwt.configuration';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(tokenConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<JwtConfiguration>('jwt');
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expires,
          },
        };
      },
    }),
    SharedModule,
    UuidModule,
  ],
  providers: [
    ...useCases,
    JwtStrategy,
    JwtGuard,
    CookieStrategy,
    CookieGuard,
    QueryStringStrategy,
    QueryStringGuard,
    UniversalStrategy,
    UniversalAuthGuard,
    RolesGuard,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
