import { Injectable } from '@nestjs/common';
import { IBcryptProvider } from './bcrypt-provider.interface';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptProvider implements IBcryptProvider {
  public async hash(data: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(data, salt);
  }

  public async compare(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }
}
