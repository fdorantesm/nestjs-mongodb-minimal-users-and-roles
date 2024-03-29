import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ResourceDocument } from '@/core/infrastructure/models/resource-document';

@Schema({
  collection: 'users',
  timestamps: true,
  autoIndex: true,
})
export class UserModel extends ResourceDocument {
  @Prop({ type: String, unique: true })
  public email: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  public username: string;

  @Prop({ type: String, select: false })
  public password: string;

  @Prop({ type: [String] })
  public roles: string[];

  @Prop({ type: Boolean, required: true })
  public isActive: boolean;

  @Prop({ type: String, unique: true })
  public profileId?: string;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export { UserSchema };
