export const EMAIL_SERVICE_TOKEN = 'EmailService';

export interface EmailService {
  send(subject: string, to: string[], template: string): Promise<void>;
}
