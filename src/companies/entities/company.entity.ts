import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

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
