export abstract class IEnvConfigService {
  public abstract getServerPort(): number;
  public abstract getServerJwtSecret(): string;
  public abstract getDatabaseUser(): string;
  public abstract getDatabasePass(): string;
  public abstract getDatabasePort(): number;
  public abstract getDatabaseHost(): string;
  public abstract getDatabaseName(): string;
}
