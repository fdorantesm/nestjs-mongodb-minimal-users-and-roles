export const SLUG_SERVICE_TOKEN = 'SlugService';

export interface SlugService {
  execute(src: string): string;
}
