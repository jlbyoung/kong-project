import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceFilterDto, ServiceResponseDto } from '../../dtos/service.dto';

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
      limit: filters.limit || 10,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ServiceResponseDto {
    return this.service.findOne(id);
  }
}
