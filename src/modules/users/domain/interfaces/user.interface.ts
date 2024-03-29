import { ResourceProps } from '@/core/domain/interfaces/resource-props.interface';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

export interface User extends ResourceProps {
  uuid: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  profileId?: string;
  // Virtuals
  profile?: Profile;
}
