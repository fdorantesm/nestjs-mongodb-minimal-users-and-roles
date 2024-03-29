import { BaseProps } from '@/core/domain/interfaces/base-props.interface';

export interface Role extends BaseProps {
  uuid: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}
