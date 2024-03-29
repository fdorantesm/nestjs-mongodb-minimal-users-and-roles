import { BaseDocument } from '@/core/infrastructure/models/base-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'profiles',
  timestamps: true,
  autoIndex: true,
})
export class ProfileModel extends BaseDocument {
  @Prop({ type: String, required: true, index: true })
  public name: string;

  @Prop({ type: String, required: true, index: true })
  public surname: string;

  @Prop({ type: String, required: true })
  public displayName: string;

  @Prop({ type: String })
  public avatar?: string;

  @Prop({ type: String })
  public bio?: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  public userId: string;
}

const ProfileSchema = SchemaFactory.createForClass(ProfileModel);

export { ProfileSchema };
