import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { ServiceVersion } from '../entities/service-version.entity';

@Injectable()
export class SeedingService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(ServiceVersion)
    private versionRepository: Repository<ServiceVersion>,
  ) {}

  async seedData() {
    // Create some sample services
    const service1 = this.serviceRepository.create({
      name: 'Service 1',
      description: 'This is the first service',
      isActive: true,
    });
    await this.serviceRepository.save(service1);

    const service2 = this.serviceRepository.create({
      name: 'Service 2',
      description: 'This is the second service',
      isActive: true,
    });
    await this.serviceRepository.save(service2);

    // Create some sample versions for the services
    const service1_version1 = this.versionRepository.create({
      version: '1.0.0',
      service: service1,
    });
    await this.versionRepository.save(service1_version1);

    const service1_version2 = this.versionRepository.create({
      version: '2.0.0',
      service: service1,
    });
    await this.versionRepository.save(service1_version2);

    const service2_version1 = this.versionRepository.create({
      version: '1.0.0',
      service: service2,
    });
    await this.versionRepository.save(service2_version1);
  }
}
