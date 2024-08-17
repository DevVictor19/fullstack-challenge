import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  client_id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: true, length: 100 })
  email: string;

  @Column({ nullable: true, unique: true, length: 11 })
  phone_number: string;

  @ManyToOne(() => Client, (client) => client.id, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
