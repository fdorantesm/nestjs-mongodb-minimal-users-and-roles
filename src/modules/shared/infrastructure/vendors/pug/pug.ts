import { renderFile } from 'pug';

import { TemplateService } from '@/modules/shared/domain/contracts/template.service.contract';

export class Pug implements TemplateService {
  public render<T>(filePath: string, data: T): string {
    return renderFile(filePath, data);
  }
}
