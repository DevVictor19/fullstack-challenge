export abstract class IBcryptProvider {
  public abstract hash(data: string): Promise<string>;
  public abstract compare(data: string, hash: string): Promise<boolean>;
}
