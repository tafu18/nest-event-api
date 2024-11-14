import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.eventRepository.create(createEventDto);

    return this.eventRepository.save(event);
  }

  async findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    return this.eventRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const result = await this.eventRepository.update(id, updateEventDto);

    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.eventRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.eventRepository.delete(id);
    return `This action removes a #${id} event`;
  }
}
