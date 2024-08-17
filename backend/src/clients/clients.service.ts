import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchClientResponseDto } from './dto/search-client-response.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { ClientMapper } from './mappers/clients.mapper';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  public async create(
    userId: number,
    createClientDto: CreateClientDto,
  ): Promise<void> {
    await this.checkIfEmailOrPhoneNumberAlreadyExists(
      createClientDto.email,
      createClientDto.phone_number,
    );

    const entity = this.clientRepository.create({
      ...createClientDto,
      user_id: userId,
    });

    await this.clientRepository.save(entity);
  }

  public async search(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<SearchClientResponseDto> {
    const [result, total] = await this.clientRepository.findAndCount({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      total,
      page,
      lastPage: Math.ceil(total / limit),
      data: ClientMapper.toResponseList(result),
    };
  }

  public async findOne(
    userId: number,
    clientId: number,
  ): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOneBy({
      user_id: userId,
      id: clientId,
    });

    if (!client) {
      throw new NotFoundException(`Cliente de id=${clientId} não encontrado`);
    }

    return ClientMapper.toResponseObject(client);
  }

  public async findOneWithContacts(userId: number, clientId: number) {
    const results = await this.clientRepository.findOne({
      where: { user_id: userId, id: clientId },
      relations: { contacts: true },
    });

    if (!results) {
      throw new NotFoundException(`Cliente de id=${clientId} não encontrado`);
    }

    return results;
  }

  public async update(
    userId: number,
    clientId: number,
    updateClientDto: UpdateClientDto,
  ): Promise<void> {
    const client = await this.findOne(userId, clientId);

    const [clientWithSameEmail, clientWithSamePn] = await Promise.all([
      this.findByEmail(updateClientDto.email),
      this.findByPhoneNumber(updateClientDto.phone_number),
    ]);

    const anotherClientHasTheSameEmail = clientWithSameEmail?.id !== client.id;

    if (clientWithSameEmail && anotherClientHasTheSameEmail) {
      throw new BadRequestException(
        `Esse email já está em uso pelo cliente de id=${clientWithSameEmail.id}`,
      );
    }

    const anotherClientHasTheSamePn = clientWithSamePn?.id !== client.id;

    if (clientWithSamePn && anotherClientHasTheSamePn) {
      throw new BadRequestException(
        `Esse telefone já está em uso pelo cliente de id=${clientWithSamePn.id}`,
      );
    }

    Object.assign(client, updateClientDto);

    await this.clientRepository.save(client);
  }

  public async remove(userId: number, clientId: number): Promise<void> {
    const client = await this.findOne(userId, clientId);

    await this.clientRepository.delete(client);
  }

  private async checkIfEmailOrPhoneNumberAlreadyExists(
    email: string,
    phoneNumber: string,
  ) {
    const [clientWithSameEmail, clientWithSamePn] = await Promise.all([
      this.findByEmail(email),
      this.findByPhoneNumber(phoneNumber),
    ]);

    if (clientWithSameEmail) {
      throw new BadRequestException(
        `Esse email já está em uso pelo cliente de id=${clientWithSameEmail.id}`,
      );
    }

    if (clientWithSamePn) {
      throw new BadRequestException(
        `Esse telefone já está em uso pelo cliente de id=${clientWithSamePn.id}`,
      );
    }
  }

  private async findByEmail(email: string) {
    return this.clientRepository.findOneBy({ email });
  }

  private async findByPhoneNumber(phoneNumber: string) {
    return this.clientRepository.findOneBy({
      phone_number: phoneNumber,
    });
  }
}
