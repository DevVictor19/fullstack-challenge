import { ClientResponseDto } from '../dto/client-response.dto';
import { Client } from '../entities/client.entity';

export class ClientMapper {
  public static toResponseObject(entity: Client): ClientResponseDto {
    return new ClientResponseDto(entity);
  }

  public static toResponseList(entity: Client[]): ClientResponseDto[] {
    return entity.map(ClientMapper.toResponseObject);
  }
}
