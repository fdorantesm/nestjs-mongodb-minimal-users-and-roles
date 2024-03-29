import { ConflictException, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UuidService } from 'nestjs-uuid';

import { Context } from '@/core/domain/interfaces/context.interface';
import { TokenService } from '@/modules/auth/application/services/token.service';
import { Token } from '@/modules/auth/domain/interfaces/token.interface';
import { RoleEntity } from '@/modules/roles/domain/entities/role.entity';
import { GetRolesQuery } from '@/modules/roles/domain/queries';
import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { Roles } from '@/modules/users/domain/enums/role.enum';
import { User } from '@/modules/users/domain/interfaces/user.interface';
import { FindUserQuery, HeadUserQuery } from '@/modules/users/domain/queries';
import { UseCase } from '@/core/application/case.decorator';
import type { Executable } from '@/core/domain/executable.interface';
import { RegisterCommand } from '@/modules/users/domain/commands/register/register.command';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

@UseCase()
export class RegisterUseCase implements Executable {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService,
    private readonly uuidService: UuidService,
  ) {}

  public async execute(
    ctx: Context,
    payload: {
      user: Omit<User, 'uuid' | 'roles' | 'isActive'>;
      profile: Omit<Profile, 'uuid' | 'userId'>;
    },
    isRecruiter: boolean,
  ): Promise<{ user: User } & Token> {
    Logger.log('Creating user with email: ' + payload.user.email, ctx.requestId);

    const isNotFirst = await this.queryBus.execute<FindUserQuery, UserEntity>(
      new FindUserQuery(),
    );

    const previousUser = await this.queryBus.execute<HeadUserQuery, UserEntity>(
      new HeadUserQuery({
        email: payload.user.email,
      }),
    );

    if (previousUser) {
      throw new ConflictException('api.users.email_already_exists');
    }

    const roles = await this.queryBus.execute<GetRolesQuery, RoleEntity[]>(new GetRolesQuery());

    const sudoerRole = roles.find((role) => role.code === Roles.SUDOER);
    const adminRole = roles.find((role) => role.code === Roles.ADMIN);
    const userRole = roles.find((role) => role.code === Roles.USER);
    const recruiterRole = roles.find((role) => role.code === Roles.RECRUITER);

    const subscriber = [userRole.uuid];
    const userRoles = isNotFirst
      ? subscriber
      : [sudoerRole.uuid, adminRole.uuid, recruiterRole.uuid, ...subscriber];

    if (isRecruiter) {
      userRoles.push(recruiterRole.uuid);
    }

    const formatedEmail = payload.user.email.toLowerCase();

    const profileId = this.uuidService.generate();
    const userId = this.uuidService.generate();

    const user = await this.commandBus.execute<RegisterCommand, UserEntity>(
      new RegisterCommand(
        {
          uuid: userId,
          email: formatedEmail,
          username: payload.user.username,
          password: payload.user.password,
          roles: userRoles,
          profileId: profileId,
          isActive: true,
        },
        {
          ...payload.profile,
          uuid: profileId,
          userId: userId,
        },
      ),
    );

    const token = await this.tokenService.create({
      uuid: user.uuid,
      roles: user.getRoles(),
    });

    return {
      ...token,
      user: user.toObject(),
    };
  }
}
