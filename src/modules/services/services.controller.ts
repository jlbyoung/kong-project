import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceFilterDto, ServiceResponseDto } from '../../dtos/service.dto';
import { ServiceVersion } from 'src/entities/service-version.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Get()
  async findAll(@Query() filters: ServiceFilterDto): Promise<{
    data: ServiceResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [services, total] = await this.service.findAll(filters);
    return {
      data: services,
      total,
      page: filters.page || 1,
      limit: filters.limit || 12,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ServiceResponseDto> {
    return this.service.findOne(id);
  }

  @Get(':id/versions')
  async findAllVersions(@Param('id') id: string): Promise<ServiceVersion[]> {
    const services = await this.service.findAllVersions(id);
    return services;
  }
}
