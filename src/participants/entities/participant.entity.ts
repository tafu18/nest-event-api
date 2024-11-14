import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ParticipantType } from '../enums/participant-type.enum';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ParticipantType,
    default: ParticipantType.PHYSICAL,
  })
  type: ParticipantType;

  @Column()
  user_id: number;

  @Column()
  event_id: number;

  @ManyToOne(() => User, (user) => user.participants)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Event, (event) => event.participants, { nullable: false })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => format(new Date(value), 'dd.MM.yyyy HH:mm:ss'), {
    toPlainOnly: true,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => format(new Date(value), 'dd.MM.yyyy HH:mm:ss'), {
    toPlainOnly: true,
  })
  updatedAt: Date;
}
