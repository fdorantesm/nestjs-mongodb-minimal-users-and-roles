import { DATE_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/date.service.contract';
import { Luxon } from '@/modules/shared/infrastructure/vendors/luxon/luxon';

export const DateService = {
  provide: DATE_SERVICE_TOKEN,
  useValue: new Luxon(),
};
