import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { ContactResponseDto } from './dto/contact-response.dto';
import { SearchContactResponseDto } from './dto/search-contact-response.dto';
import { ContactMapper } from './mappers/contacts.mapper';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    private readonly clientsService: ClientsService,
  ) {}

  public async create(userId: number, createContactDto: CreateContactDto) {
    await this.clientsService.findOne(userId, createContactDto.client_id);

    await this.checkIfEmailOrPhoneNumberAlreadyExists(
      createContactDto.email,
      createContactDto.phone_number,
    );

    const entity = this.contactsRepository.create(createContactDto);

    await this.contactsRepository.save(entity);
  }

  public async search(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<SearchContactResponseDto> {
    const [result, total] = await this.contactsRepository.findAndCount({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      data: ContactMapper.toResponseList(result),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  public async findOne(
    userId: number,
    contactId: number,
  ): Promise<ContactResponseDto> {
    const contact = await this.contactsRepository.findOneBy({
      user_id: userId,
      id: contactId,
    });

    if (!contact) {
      throw new NotFoundException(`Contato de id=${contactId} não encontrado`);
    }

    return ContactMapper.toResponseObject(contact);
  }

  public async update(
    userId: number,
    contactId: number,
    updateContactDto: UpdateContactDto,
  ) {
    const contact = await this.findOne(userId, contactId);

    const [contactWithSameEmail, contactWithSamePn] = await Promise.all([
      this.findByEmail(updateContactDto.email),
      this.findByPhoneNumber(updateContactDto.phone_number),
    ]);

    const anotherClientHasTheSameEmail =
      contactWithSameEmail?.id !== contact.id;

    if (contactWithSameEmail && anotherClientHasTheSameEmail) {
      throw new BadRequestException(
        `Esse email já está em uso pelo contato de id=${contactWithSameEmail.id}`,
      );
    }

    const anotherClientHasTheSamePn = contactWithSamePn?.id !== contact.id;

    if (contactWithSamePn && anotherClientHasTheSamePn) {
      throw new BadRequestException(
        `Esse telefone já está em uso pelo contato de id=${contactWithSamePn.id}`,
      );
    }

    Object.assign(contact, updateContactDto);

    await this.contactsRepository.save(contact);
  }

  public async remove(userId: number, contactId: number) {
    const contact = await this.findOne(userId, contactId);

    await this.contactsRepository.delete(contact);
  }

  private async checkIfEmailOrPhoneNumberAlreadyExists(
    email: string,
    phoneNumber: string,
  ) {
    const [contactWithSameEmail, contactWithSamePn] = await Promise.all([
      this.findByEmail(email),
      this.findByPhoneNumber(phoneNumber),
    ]);

    if (contactWithSameEmail) {
      throw new BadRequestException(
        `Esse email já está em uso pelo contato de id=${contactWithSameEmail.id}`,
      );
    }

    if (contactWithSamePn) {
      throw new BadRequestException(
        `Esse telefone já está em uso pelo contato de id=${contactWithSamePn.id}`,
      );
    }
  }

  private async findByEmail(email: string) {
    return this.contactsRepository.findOneBy({ email });
  }

  private async findByPhoneNumber(phoneNumber: string) {
    return this.contactsRepository.findOneBy({ phone_number: phoneNumber });
  }
}
