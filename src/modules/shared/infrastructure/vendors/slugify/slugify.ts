import slugify from 'slugify';

import { SlugService } from '@/modules/shared/domain/contracts/slug.service.contract';

export class Slugify implements SlugService {
  public execute(src: string): string {
    return slugify(src);
  }
}
