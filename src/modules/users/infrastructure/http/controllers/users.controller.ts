import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Context } from '@/core/domain/interfaces/context.interface';
import { RolesGuard } from '@/modules/auth/application/guards/role.guard';
import { UniversalAuthGuard } from '@/modules/auth/application/guards/universal.guard';
import { WithRoles } from '@/modules/auth/infrastructure/http/decorators/roles.decorator';
import { CreateUserUseCase } from '@/modules/users/application/use-cases/create-user/create-user.use-case';
import { DeleteUserUseCase } from '@/modules/users/application/use-cases/delete-user/delete-user.use-case';
import { GetUserUseCase } from '@/modules/users/application/use-cases/get-user/get-user.use-case';
import { ListUsersUseCase } from '@/modules/users/application/use-cases/list-users/list-users.use-case';
import { UpdateUserUseCase } from '@/modules/users/application/use-cases/update-user/update-user.use-case';
import { Roles } from '@/modules/users/domain/enums/role.enum';
import { CreateUserDto } from '@/modules/users/infrastructure/http/dtos/create-user.dto';
import { UpdateUserDto } from '@/modules/users/infrastructure/http/dtos/update-user.dto';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';

@ApiTags('Users')
@Controller({
  version: '1',
  path: '/users',
})
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Get('/')
  public async list(@Ctx() ctx: Context) {
    return await this.listUsersUseCase.execute(ctx, {});
  }

  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Get('/:uuid')
  public async show(@Ctx() ctx: Context, @Param('uuid') uuid: string) {
    return await this.getUserUseCase.execute(ctx, uuid);
  }

  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Post('/')
  public async create(@Ctx() ctx: Context, @Body() body: CreateUserDto) {
    return await this.createUserUseCase.execute(ctx, {
      user: {
        email: body.email,
        password: body.password,
        username: body.username,
      },
      profile: body.profile,
    });
  }

  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Patch('/:uuid')
  public async update(
    @Ctx() ctx: Context,
    @Param('uuid') uuid: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.updateUserUseCase.execute(ctx, uuid, body);
  }

  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Delete('/:uuid')
  public async delete(@Ctx() ctx: Context, @Param('uuid') uuid: string) {
    return await this.deleteUserUseCase.execute(ctx, uuid);
  }
}
