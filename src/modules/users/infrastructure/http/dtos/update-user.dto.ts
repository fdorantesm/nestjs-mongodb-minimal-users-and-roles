import { OmitType } from '@nestjs/swagger';

import { CreateUserDto } from '@/modules/users/infrastructure/http/dtos/create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['profile', 'password']) {}
