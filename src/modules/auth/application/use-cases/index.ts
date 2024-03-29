import { LoginUseCase } from '@/modules/auth/application/use-cases/login/login.use-case';
import { MeUseCase } from '@/modules/auth/application/use-cases/me/me-use-case';
import { RegisterUseCase } from '@/modules/auth/application/use-cases/register/register.use-case';
import { ValidateTokenUseCase } from '@/modules/auth/application/use-cases/validate-token/validate-token.use-case';

export * from '@/modules/auth/application/use-cases/login/login.use-case';
export * from '@/modules/auth/application/use-cases/me/me-use-case';
export * from '@/modules/auth/application/use-cases/register/register.use-case';
export * from '@/modules/auth/application/use-cases/validate-token/validate-token.use-case';
export * from '@/modules/auth/application/use-cases/login/login.use-case';

export const useCases = [LoginUseCase, RegisterUseCase, ValidateTokenUseCase, MeUseCase];
