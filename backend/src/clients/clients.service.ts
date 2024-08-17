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
import { FindOneClientResponseDto } from './dto/find-one-client-response.dto';

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
    const [clientWithSameEmail, clientWithSamePn] = await Promise.all([
      this.clientRepository.findOneBy({ email: createClientDto.email }),
      this.clientRepository.findOneBy({
        phone_number: createClientDto.phone_number,
      }),
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
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  public async findOne(
    userId: number,
    clientId: number,
  ): Promise<FindOneClientResponseDto> {
    const client = await this.clientRepository.findOneBy({
      user_id: userId,
      id: clientId,
    });

    if (!client) {
      throw new NotFoundException(`Cliente de id=${clientId} não encontrado`);
    }

    return client;
  }

  public async update(
    userId: number,
    clientId: number,
    updateClientDto: UpdateClientDto,
  ): Promise<void> {
    const client = await this.findOne(userId, clientId);

    Object.assign(client, updateClientDto);

    await this.clientRepository.save(client);
  }

  public async remove(userId: number, clientId: number): Promise<void> {
    const client = await this.findOne(userId, clientId);

    await this.clientRepository.delete(client);
  }
}
