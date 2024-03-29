import { TokenPayload } from '@/modules/auth/domain/interfaces/token-payload.interface';
import { Token } from '@/modules/auth/domain/interfaces/token.interface';

export const TOKENIZER_SERVICE_TOKEN = 'TokenizerService';

export interface TokenizerService {
  create(payload: TokenPayload): Promise<Token>;
  decode(token: string): TokenPayload;
}
