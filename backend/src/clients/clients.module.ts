import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client]), UsersModule],
  exports: [ClientsService],
})
export class ClientsModule {}
