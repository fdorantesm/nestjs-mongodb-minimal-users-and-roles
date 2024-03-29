import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Context } from '@/core/domain/interfaces/context.interface';
import { Request } from '@/core/infrastructure/types/http/request.type';
import { UniversalAuthGuard } from '@/modules/auth/application/guards/universal.guard';
import { LoginUseCase } from '@/modules/auth/application/use-cases/login/login.use-case';
import { MeUseCase } from '@/modules/auth/application/use-cases/me/me-use-case';
import { RegisterUseCase } from '@/modules/auth/application/use-cases/register/register.use-case';
import { LoginRequestDto } from '@/modules/auth/infrastructure/http/dtos/login-request.dto';
import { RegisterRequestDto } from '@/modules/auth/infrastructure/http/dtos/register-request.dto';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';

@ApiTags('Auth')
@Controller({
  version: VERSION_NEUTRAL,
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly meUseCase: MeUseCase,
  ) {}

  @ApiOperation({ summary: 'Sign in with an account' })
  @ApiBody({
    description: 'Get a signed web token to make protected requests',
    type: LoginRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login successful',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/login')
  public async login(@Ctx() ctx: Context, @Body() credentials: LoginRequestDto) {
    const token = await this.loginUseCase.execute(ctx, credentials.email, credentials.password);

    return token;
  }

  @ApiOperation({ summary: 'Register an account' })
  @ApiBody({
    description: 'Register an administrator at first time',
    type: RegisterRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin registered and logged in successful',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/register')
  public async register(@Ctx() ctx: Context, @Body() body: RegisterRequestDto) {
    const payload = {
      user: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      profile: body.profile,
    };
    return await this.registerUseCase.execute(ctx, payload, body.isRecruiter);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user data' })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @UseGuards(UniversalAuthGuard)
  @Get('/me')
  public async me(@Ctx() ctx: Context, @Req() request: Request) {
    return await this.meUseCase.execute(ctx, request.user.uuid);
  }
}
