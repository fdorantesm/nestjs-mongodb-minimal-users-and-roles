import { TEMPLATE_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/template.service.contract';
import { Pug } from '@/modules/shared/infrastructure/vendors/pug/pug';

export const TemplateService = {
  provide: TEMPLATE_SERVICE_TOKEN,
  useValue: new Pug(),
};
