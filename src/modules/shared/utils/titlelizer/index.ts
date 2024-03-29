import { Provider } from '@nestjs/common';

import { TITLELIZER_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/title.service.contract';
import { Titlelizer } from '@/modules/shared/utils/titlelizer/titlelizer';

export const TitlelizerService: Provider = {
  provide: TITLELIZER_SERVICE_TOKEN,
  useValue: new Titlelizer(),
};
