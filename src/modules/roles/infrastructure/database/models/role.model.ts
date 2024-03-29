import { Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Role } from '@/modules/roles/domain/interfaces/role.interface';

@Schema({
  collection: 'roles',
  timestamps: true,
  autoIndex: true,
})
export class RoleModel extends Document implements Role {
  @Prop({ type: String, unique: true })
  public uuid: string;

  @Prop({ type: String, unique: true })
  public name: string;

  @Prop({ type: String, unique: true })
  public code: string;

  @Prop({ type: String })
  public description: string;

  @Prop({ type: String })
  public status: string;

  @Prop({ type: Boolean })
  public isActive: boolean;
}
