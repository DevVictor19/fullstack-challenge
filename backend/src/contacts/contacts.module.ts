import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule } from 'src/clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [UsersModule, ClientsModule, TypeOrmModule.forFeature([Contact])],
})
export class ContactsModule {}
