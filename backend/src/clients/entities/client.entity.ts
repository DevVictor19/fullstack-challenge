import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: true, length: 100 })
  email: string;

  @Column({ nullable: true, unique: true, length: 11 })
  phone_number: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
