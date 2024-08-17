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
import { FindOneContactResponseDto } from './dto/find-one-contact-response.dto';
import { SearchContactResponseDto } from './dto/search-contact-response.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    private readonly clientsService: ClientsService,
  ) {}

  public async create(userId: number, createContactDto: CreateContactDto) {
    await this.clientsService.findOne(userId, createContactDto.client_id);

    const [contactWithSameEmail, contactWithSamePn] = await Promise.all([
      this.contactsRepository.findOneBy({ email: createContactDto.email }),
      this.contactsRepository.findOneBy({
        phone_number: createContactDto.phone_number,
      }),
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
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  public async findOne(
    userId: number,
    contactId: number,
  ): Promise<FindOneContactResponseDto> {
    const contact = await this.contactsRepository.findOneBy({
      user_id: userId,
      id: contactId,
    });

    if (!contact) {
      throw new NotFoundException(`Contato de id=${contactId} não encontrado`);
    }

    return contact;
  }

  public async update(
    userId: number,
    contactId: number,
    updateContactDto: UpdateContactDto,
  ) {
    const contact = await this.findOne(userId, contactId);

    Object.assign(contact, updateContactDto);

    await this.contactsRepository.save(contact);
  }

  public async remove(userId: number, contactId: number) {
    const contact = await this.findOne(userId, contactId);

    await this.contactsRepository.delete(contact);
  }
}
