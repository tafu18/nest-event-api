import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto, UserId: number) {
    createParticipantDto.user_id = UserId;
    const participant =
      await this.participantRepository.create(createParticipantDto);
    return this.participantRepository.save(participant);
  }

  async findAll() {
    return this.participantRepository.find({
      relations: ['user', 'event'],
    });
  }

  async findOne(id: number) {
    return this.participantRepository.findOneOrFail({
      where: { id },
      relations: ['user', 'event'],
    });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const result = await this.participantRepository.update(
      id,
      updateParticipantDto,
    );

    if (result.affected === 0) {
      throw new Error(`Participant with id ${id} not found`);
    }

    return this.participantRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    this.participantRepository.delete(id);
    return `This action removes a #${id} participant`;
  }
}
