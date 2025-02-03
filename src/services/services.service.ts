import { Get, Injectable, Query } from '@nestjs/common';

@Injectable()
export class ServicesService {
  @Get()
  findAll(): string {
    return 'Hello World!';
  }
}
