import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Context } from '@/core/domain/interfaces/context.interface';
import { RolesGuard } from '@/modules/auth/application/guards/role.guard';
import { UniversalAuthGuard } from '@/modules/auth/application/guards/universal.guard';
import { WithRoles } from '@/modules/auth/infrastructure/http/decorators/roles.decorator';
import { CreateRoleUseCase } from '@/modules/roles/application/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from '@/modules/roles/application/use-cases/delete-role.use-case';
import { ListRolesUseCase } from '@/modules/roles/application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '@/modules/roles/application/use-cases/update-role.use-case';
import { CreateRoleDto } from '@/modules/roles/infrastructure/http/dtos/create-role.dto';
import { UpdateRoleDto } from '@/modules/roles/infrastructure/http/dtos/update-role.dto';
import { Roles } from '@/modules/users/domain/enums/role.enum';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';

@ApiTags('Roles')
@Controller({
  version: '1',
  path: 'roles',
})
export class RolesController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly listRolesUseCase: ListRolesUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
  ) {}

  @ApiBearerAuth()
  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Get('/')
  public async listRoles(@Ctx() ctx: Context) {
    return await this.listRolesUseCase.execute(ctx);
  }

  @ApiBearerAuth()
  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Post('/')
  public async createRole(@Ctx() ctx: Context, @Body() body: CreateRoleDto) {
    return await this.createRoleUseCase.execute(ctx, body);
  }

  @ApiBearerAuth()
  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Patch('/:roleId')
  public async updateRole(
    @Ctx() ctx: Context,
    @Param('roleId') roleId: string,
    @Body() body: UpdateRoleDto,
  ) {
    return await this.updateRoleUseCase.execute(ctx, roleId, body);
  }

  @ApiBearerAuth()
  @WithRoles(Roles.ADMIN)
  @UseGuards(UniversalAuthGuard, RolesGuard)
  @Delete('/:roleId')
  public async deleteRole(@Ctx() ctx: Context, @Param('roleId') roleId: string) {
    return await this.deleteRoleUseCase.execute(ctx, roleId);
  }
}
