import { SLUG_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/slug.service.contract';
import { Slugify } from '@/modules/shared/infrastructure/vendors/slugify/slugify';

export const SlugService = {
  provide: SLUG_SERVICE_TOKEN,
  useValue: new Slugify(),
};
