import { Get, Injectable, Param, Query } from '@nestjs/common';
import { ServiceFilterDto, ServiceResponseDto } from 'src/dtos/service.dto';

@Injectable()
export class ServicesService {
  @Get()
  findAll(@Query() filters: ServiceFilterDto): {
    data: ServiceResponseDto[];
    total: number;
    page: number;
    limit: number;
  } {
    return { data: [], total: 0, page: 0, limit: 0 };
  }
  @Get()
  findOne(@Param('id') id: string): ServiceResponseDto {
    return { id: '', name: '', description: '', versionsCount: 1 };
  }
}
