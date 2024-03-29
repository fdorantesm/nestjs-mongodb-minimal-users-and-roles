export const TEMPLATE_SERVICE_TOKEN = 'TemplateService';

export interface TemplateService {
  render(filePath: string, data?: { [key: string]: any }): string;
}
