import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>
  ){}
  async create(createParticipantDto: CreateParticipantDto) {
    const participant = await this.participantRepository.create(createParticipantDto);
    return this.participantRepository.save(participant);
  }

  async findAll() {
    return this.participantRepository.find({
      relations: ['user', 'event'],
    });
  }

  async findOne(id: number) {
    return this.participantRepository.findOneByOrFail({id});
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.participantRepository.findOne({ where: { id }, relations: ['user', 'event'] });
  
    if (!participant) {
      throw new Error(`Participant with id ${id} not found`);
    }
  
    if (updateParticipantDto.user_id) {
      participant.user = { id: updateParticipantDto.user_id } as User;
    }
    if (updateParticipantDto.event_id) {
      participant.event = { id: updateParticipantDto.event_id } as Event;
    }
  
    if (updateParticipantDto.type) {
      participant.type = updateParticipantDto.type;
    }
  
    await this.participantRepository.save(participant);
    return this.participantRepository.findOne({ where: { id } });
  }
  

  async remove(id: number) {
    this.participantRepository.delete(id);
    return `This action removes a #${id} participant`;
  }
}
