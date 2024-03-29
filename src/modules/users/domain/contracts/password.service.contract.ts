export const PASSWORD_SERVICE = 'PasswordService';

export interface PasswordService {
  generate(value: string, salts?: number): Promise<string>;
  match(source: string, hash: string): Promise<boolean>;
}
