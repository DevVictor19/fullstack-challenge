import { ContactResponseDto } from '../dto/contact-response.dto';
import { Contact } from '../entities/contact.entity';

export class ContactMapper {
  public static toResponseObject(entity: Contact): ContactResponseDto {
    return new ContactResponseDto(entity);
  }

  public static toResponseList(entity: Contact[]): ContactResponseDto[] {
    return entity.map(ContactMapper.toResponseObject);
  }
}
