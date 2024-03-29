export const TITLELIZER_SERVICE_TOKEN = 'TitlelizerService';

export interface TitlelizerService {
  titlelize(slug: string): string;
}
