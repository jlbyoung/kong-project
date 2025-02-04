import { Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateServiceDto,
  ServiceFilterDto,
  ServiceResponseDto,
} from 'src/dtos/service.dto';
import { ServiceVersion } from 'src/entities/service-version.entity';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(ServiceVersion)
    private versionsRepository: Repository<ServiceVersion>,
  ) {}

  async findAll(
    @Query() filters: ServiceFilterDto,
  ): Promise<[ServiceResponseDto[], number]> {
    const query = this.servicesRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.versions', 'versions');

    if (filters.name) {
      query.andWhere('(service.name ILIKE :name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.isActive) {
      query.andWhere('service.isActive = :isActive', {
        isActive: filters.isActive,
      });
    }

    if (filters.sortBy) {
      query.orderBy(`service.${filters.sortBy}`, filters.sortOrder || 'ASC');
    }

    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const skip = (page - 1) * limit;

    query.skip(skip).take(limit);

    const [services, total] = await query.getManyAndCount();

    return [
      services.map((service) => ({
        id: service.id,
        name: service.name,
        description: service.description,
        versionsCount: service.versions.length,
      })),
      total,
    ];
  }

  async findOne(@Param('id') id: string): Promise<ServiceResponseDto> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['versions'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return {
      id: service.id,
      name: service.name,
      description: service.description,
      versionsCount: service.versions.length,
      versions: service.versions.map((version) => ({
        id: version.id,
        version: version.version,
      })),
    };
  }

  async findAllVersions(@Param('id') id: string): Promise<ServiceVersion[]> {
    console.log(id);
    const serviceVersions = this.versionsRepository.find({
      where: { service: { id: id }, isActive: true },
      order: { releasedAt: 'DESC' },
    });

    return serviceVersions;
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto);
    return await this.servicesRepository.save(service);
  }
}
