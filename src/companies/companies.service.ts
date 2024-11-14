import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  async findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    return this.companyRepository.findOneBy({id});
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const result = await this.companyRepository.update(id, updateCompanyDto);

    if (result.affected === 0) {
      throw new Error(`Company with id ${id} not found`);
    }
  
    return this.companyRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.companyRepository.delete(id);
    return `This action removes a #${id} company`;
  }
}
