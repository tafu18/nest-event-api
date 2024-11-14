import { Company } from 'src/companies/entities/company.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  @OneToMany(() => Participant, (participant) => participant.user)
  participants: Participant[];

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => format(new Date(value), 'dd.MM.yyyy HH:mm:ss'), { toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => format(new Date(value), 'dd.MM.yyyy HH:mm:ss'), { toPlainOnly: true })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}