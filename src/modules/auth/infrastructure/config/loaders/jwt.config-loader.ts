import { registerAs } from '@nestjs/config';
import { JwtConfiguration } from '@/core/infrastructure/types/jwt/jwt.configuration';

export const tokenConfigLoader = registerAs(
  'jwt',
  (): JwtConfiguration => ({
    expires: process.env.JWT_EXPIRES,
    secret: process.env.JWT_SECRET,
  }),
);
