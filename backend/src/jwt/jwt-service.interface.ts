export type Payload = string | object | Buffer;
export type ExpiresIn = string | number | undefined;

export type TokenSignOptions = {
  payload: Payload;
  expiresIn: ExpiresIn;
};

export type JwtPayload = {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
};

export abstract class IJwtProvider {
  public abstract sign({ payload, expiresIn }: TokenSignOptions): string;
  public abstract verify(token: string): JwtPayload | string;
}
