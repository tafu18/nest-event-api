import { Participant } from 'src/participants/entities/participant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  date: Date;

  @OneToMany(() => Participant, (participant) => participant.event)
  participants: Participant[];

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
