import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { ServiceFilterDto, ServiceResponseDto } from '../dtos/service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Get()
  findAll(@Query() filters: ServiceFilterDto): {
    data: ServiceResponseDto[];
    total: number;
    page: number;
    limit: number;
  } {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string): ServiceResponseDto {
    return this.service.findOne(id);
  }
}
