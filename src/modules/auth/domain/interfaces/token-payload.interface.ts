export interface TokenPayload {
  uuid: string;

  roles: string[];
  iat?: number;

  exp?: number;
}
