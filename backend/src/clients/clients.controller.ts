import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Query,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RequireAuthentication } from 'src/auth/auth.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('/api/v1/clients')
@RequireAuthentication()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiResponse({
    description: 'Email ou telefone já utilizados',
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Req() req: any, @Body() createClientDto: CreateClientDto) {
    const user: User = req.user;

    await this.clientsService.create(user.id, createClientDto);
  }

  @Get()
  async findAll(
    @Req() req: any,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const user: User = req.user;

    return this.clientsService.search(user.id, page, limit);
  }

  @Get(':id')
  @ApiResponse({
    description: 'Cliente não encontrado',
    status: HttpStatus.NOT_FOUND,
  })
  async findOne(@Req() req: any, @Param('id') id: number) {
    const user: User = req.user;

    return this.clientsService.findOne(user.id, id);
  }

  @Put(':id')
  @ApiResponse({
    description: 'Cliente não encontrado',
    status: HttpStatus.NOT_FOUND,
  })
  async update(
    @Req() req: any,
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const user: User = req.user;

    return this.clientsService.update(user.id, id, updateClientDto);
  }

  @Delete(':id')
  @ApiResponse({
    description: 'Cliente não encontrado',
    status: HttpStatus.NOT_FOUND,
  })
  async remove(@Req() req: any, @Param('id') id: number) {
    const user: User = req.user;

    return this.clientsService.remove(user.id, id);
  }
}
