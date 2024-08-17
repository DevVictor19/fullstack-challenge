import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { RequireAuthentication } from 'src/auth/auth.decorator';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Contacts')
@ApiBasicAuth()
@Controller('/api/v1/contacts')
@RequireAuthentication()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiResponse({
    description: 'Email ou telefone já utilizados',
    status: HttpStatus.BAD_REQUEST,
  })
  create(@Req() req: any, @Body() createContactDto: CreateContactDto) {
    const user: User = req.user;

    return this.contactsService.create(user.id, createContactDto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const user: User = req.user;

    return this.contactsService.search(user.id, page, limit);
  }

  @Get(':id')
  @ApiResponse({
    description: 'Contato não encontrado',
    status: HttpStatus.NOT_FOUND,
  })
  findOne(@Req() req: any, @Param('id') id: number) {
    const user: User = req.user;

    return this.contactsService.findOne(user.id, id);
  }

  @Put(':id')
  @ApiResponse({
    description: 'Email ou telefone já utilizados',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Contato não encontrado',
    status: HttpStatus.NOT_FOUND,
  })
  update(
    @Req() req: any,
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const user: User = req.user;

    return this.contactsService.update(user.id, id, updateContactDto);
  }

  @Delete(':id')
  @ApiResponse({
    description: 'Contato não encontrado',
    status: HttpStatus.NOT_FOUND,
  })
  remove(@Req() req: any, @Param('id') id: number) {
    const user: User = req.user;

    return this.contactsService.remove(user.id, id);
  }
}
