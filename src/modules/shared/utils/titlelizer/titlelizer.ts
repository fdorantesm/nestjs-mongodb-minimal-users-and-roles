import { TitlelizerService } from '@/modules/shared/domain/contracts/title.service.contract';

export class Titlelizer implements TitlelizerService {
  public titlelize(slug: string): string {
    const result = slug.replace(/-/g, ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
