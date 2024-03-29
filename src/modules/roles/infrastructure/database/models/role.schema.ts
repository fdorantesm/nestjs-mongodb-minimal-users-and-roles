import { SchemaFactory } from '@nestjs/mongoose';

import { RoleModel } from '@/modules/roles/infrastructure/database/models/role.model';

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
