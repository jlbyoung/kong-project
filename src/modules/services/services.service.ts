import { Get, Injectable, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceFilterDto, ServiceResponseDto } from 'src/dtos/service.dto';
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
  @Get()
  async findAll(
    @Query() filters: ServiceFilterDto,
  ): Promise<[ServiceResponseDto[], number]> {
    const query = this.servicesRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.versions', 'versions')
      .where('1=1');

    if (filters.search) {
      query.andWhere(
        '(service.name ILIKE :search OR service.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters.isActive !== undefined) {
      query.andWhere('service.isActive = :isActive', {
        isActive: filters.isActive,
      });
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;
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
  @Get()
  findOne(@Param('id') id: string): ServiceResponseDto {
    return { id: '', name: '', description: '', versionsCount: 1 };
  }
}
